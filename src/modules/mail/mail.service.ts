import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { FilePathHelper } from '../../utils/file-path-helper';
import { MailSender } from '../../utils/mail-sender';

@Injectable()
export class MailService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @InjectRepository(InvoiceEntity)
    private invoiceEntityRepository: Repository<InvoiceEntity>,
    private filePathHelper: FilePathHelper,
    private mailSender: MailSender,
  ) {}

  async sendMailAsync(invoiceId: string): Promise<boolean> {
    const invoice = await this.invoiceEntityRepository.findOne({
      where: {
        id: invoiceId,
      },
    });

    const payment = await invoice.payment;
    const sender = await invoice.sender;
    const client = await payment.client;
    const company = await client.company;

    const fileInfo = this.filePathHelper.pdfFilePathGeneration(
      invoice.invoiceNumber,
    );

    try {
      const result = await this.mailSender.sendInvoiceAsync(
        invoice,
        sender,
        client,
        company,
        fileInfo,
      );

      return !(result && result.rejected.length > 0);
    } catch (error) {
      return false;
    }
  }
}
