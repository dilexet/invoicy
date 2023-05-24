import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { writeFile } from 'fs-extra';
import { EntityManager, Repository } from 'typeorm';
import * as moment from 'moment';
import { PdfGeneratorService } from '../../utils/pdf-generator.service';
import { HtmlTemplatesReader } from '../../utils/html-templates-reader';
import { FilePathHelper } from '../../utils/file-path-helper';
import { ClientEntity } from '../../database/entity/client.entity';
import { ClientViewModel } from '../client-management/view-model/client.view-model';
import { CompanyEntity } from '../../database/entity/company.entity';
import { CompanyViewModel } from '../company-management/view-model/company.view-model';
import { CompletedWorkEntity } from '../../database/entity/completed-work.entity';
import { CompletedWorkViewModel } from '../payment/view-model/completed-work.view-model';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { InvoiceViewModel } from './view-model/invoice.view-model';
import { PaymentEntity } from '../../database/entity/payment.entity';
import { GenerateInvoiceDto } from './dto/generate-invoice.dto';
import { InvoiceFileViewModel } from './view-model/invoice-file.view-model';
import { SenderViewModel } from './view-model/sender.view-model';
import { SenderEntity } from '../../database/entity/sender.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @InjectRepository(PaymentEntity)
    private paymentEntityRepository: Repository<PaymentEntity>,
    @InjectRepository(InvoiceEntity)
    private invoiceEntityRepository: Repository<InvoiceEntity>,
    private readonly pdfGeneratorService: PdfGeneratorService,
    private readonly htmlTemplatesReader: HtmlTemplatesReader,
    private readonly filePathHelper: FilePathHelper,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async generateAsync(
    generateInvoiceDto: GenerateInvoiceDto,
  ): Promise<InvoiceViewModel> {
    const payment = await this.paymentEntityRepository.findOne({
      where: { id: generateInvoiceDto.paymentId },
      relations: { client: { company: true }, completedWorks: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const completedWorks = await payment.completedWorks;

    const invoice = new InvoiceEntity();
    invoice.totalPrice = this.calculateTotalPrice(completedWorks);

    const senderEntity = this.mapper.map(
      generateInvoiceDto,
      GenerateInvoiceDto,
      SenderEntity,
    );

    invoice.sender = Promise.resolve(senderEntity);

    invoice.payment = Promise.resolve(payment);

    const queryRunner = this.entityManager.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    const invoiceCreated = await queryRunner.manager.save(invoice);

    try {
      const invoiceData = await this.invoiceCreateAsync(
        generateInvoiceDto,
        payment,
        invoiceCreated,
      );

      await this.generateInvoice(invoiceData);

      const invoiceView = this.mapper.map(
        invoiceData,
        InvoiceFileViewModel,
        InvoiceViewModel,
      );
      await queryRunner.commitTransaction();
      return invoiceView;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async generateInvoice(
    invoiceData: InvoiceFileViewModel,
  ): Promise<void> {
    const fileInfoModel = this.filePathHelper.pdfFilePathGeneration(
      invoiceData.invoiceNumber,
    );

    const templatePath = this.config.get<string>('INVOICE_TEMPLATE_PATH');

    const htmlTemplate: string =
      await this.htmlTemplatesReader.compiledHtmlTemplateASync(
        templatePath,
        invoiceData,
      );

    this.pdfGeneratorService
      .generatePdfFromTemplate(htmlTemplate)
      .subscribe(async (pdfBuffer: Buffer) => {
        await writeFile(fileInfoModel.filePath, pdfBuffer);
      });
  }

  private async invoiceCreateAsync(
    generateInvoiceDto: GenerateInvoiceDto,
    payment: PaymentEntity,
    invoice: InvoiceEntity,
  ): Promise<InvoiceFileViewModel> {
    const client = await payment.client;
    const company = await client.company;
    const completedWorks = await payment.completedWorks;

    const invoiceData = new InvoiceFileViewModel();
    invoiceData.client = this.mapper.map(client, ClientEntity, ClientViewModel);

    invoiceData.company = this.mapper.map(
      company,
      CompanyEntity,
      CompanyViewModel,
    );

    invoiceData.completedWorks = this.mapper.mapArray(
      completedWorks,
      CompletedWorkEntity,
      CompletedWorkViewModel,
    );

    invoiceData.totalPrice = invoice.totalPrice.toFixed(2);

    invoiceData.invoiceNumber = invoice.invoiceNumber;

    const invoiceDateFormat = this.config.get<string>('INVOICE_DATE_FORMAT');
    invoiceData.invoiceDate = moment(invoice.invoiceDate).format(
      invoiceDateFormat,
    );
    invoiceData.requestDate = moment(payment.requestDate).format(
      invoiceDateFormat,
    );
    invoiceData.sender = this.mapper.map(
      generateInvoiceDto,
      GenerateInvoiceDto,
      SenderViewModel,
    );

    return invoiceData;
  }

  private calculateTotalPrice(completedWorks: CompletedWorkEntity[]): number {
    return completedWorks.reduce(
      (totalPrice, completedWork) => totalPrice + +completedWork.price,
      0,
    );
  }
}
