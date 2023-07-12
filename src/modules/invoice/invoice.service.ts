import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EntityManager, Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { InvoiceViewModel } from './view-model/invoice.view-model';
import { PaymentEntity } from '../../database/entity/payment.entity';
import { GenerateInvoiceDto } from './dto/generate-invoice.dto';
import { InvoiceFileViewModel } from './view-model/invoice-file.view-model';
import { SenderEntity } from '../../database/entity/sender.entity';
import {
  INVOICE_GENERATE_QUEUE_NAME,
  MAIL_SENDER_QUEUE_NAME,
} from '../../constants/queue.constants';
import { InvoiceHelpers } from './utils/invoice.helpers';

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
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectQueue(MAIL_SENDER_QUEUE_NAME)
    private mailSenderQueue: Queue,
    @InjectQueue(INVOICE_GENERATE_QUEUE_NAME)
    private invoiceGenerationQueue: Queue,
    private readonly invoiceHelpers: InvoiceHelpers,
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
    invoice.totalPrice =
      this.invoiceHelpers.calculateTotalPrice(completedWorks);

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
      const invoiceData = await this.invoiceHelpers.invoiceCreateAsync(
        generateInvoiceDto,
        payment,
        invoiceCreated,
      );

      await this.invoiceGenerationQueue.add(invoiceData);

      await this.mailSenderQueue.add(invoiceCreated.id);

      await queryRunner.commitTransaction();

      return this.mapper.map(
        invoiceData,
        InvoiceFileViewModel,
        InvoiceViewModel,
      );
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
