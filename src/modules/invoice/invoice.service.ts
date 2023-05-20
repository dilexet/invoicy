import { Inject, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../../database/entity/paymentEntity';
import { PdfGeneratorService } from '../../utils/pdf-generator.service';
import { writeFile } from 'fs-extra';
import { ConfigService } from '@nestjs/config';
import { HtmlTemplatesReader } from '../../utils/html-templates-reader';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @InjectRepository(PaymentEntity)
    private paymentEntityRepository: Repository<PaymentEntity>,
    private readonly pdfGeneratorService: PdfGeneratorService,
    private readonly htmlTemplatesReader: HtmlTemplatesReader,
  ) {}

  async generateAsync() {
    const templatePath = this.config.get<string>('INVOICE_TEMPLATE');
    const outputPath = `${this.config.get<string>(
      'PDF_FILES_DIRECTORY',
    )}/output.pdf`;

    const data = {
      client: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
      },
      clientCompany: {
        name: 'ABC Company',
        address: '123 Main St, City, Country',
        phone: '123-456-7890',
      },
      invoiceNumber: 'INV-001',
      invoiceDate: '2023-05-20',
      invoiceItems: [
        { item: 'Item 1', price: 10 },
        { item: 'Item 2', price: 20 },
        { item: 'Item 3', price: 30 },
      ],
      totalAmount: 60,
      sender: {
        organization: 'Your Organization',
        address: '456 Street, City, Country',
        phone: '987-654-3210',
      },
    };

    const htmlTemplate: string =
      await this.htmlTemplatesReader.compiledHtmlTemplateASync(
        templatePath,
        data,
      );

    writeFile(
      `${this.config.get<string>('PDF_FILES_DIRECTORY')}/output-template.html`,
      htmlTemplate,
    );

    this.pdfGeneratorService
      .generatePdfFromTemplate(htmlTemplate)
      .subscribe((pdfBuffer: Buffer) => {
        writeFile(outputPath, pdfBuffer);
      });

    return 'PDF generated successfully!';
  }
}
