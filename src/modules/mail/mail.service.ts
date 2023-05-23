import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { SendMailDto } from './dto/send-mail.dto';
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

  async sendMailAsync(sendMailDto: SendMailDto): Promise<SendMailDto> {
    const invoice = await this.invoiceEntityRepository.findOne({
      where: {
        id: sendMailDto.invoiceId,
      },
    });

    const payment = await invoice.payment;
    const sender = await invoice.sender;
    const client = await payment.client;
    const company = await client.company;

    const fileInfo = this.filePathHelper.pdfFilePathGeneration(
      invoice.invoiceNumber,
    );

    await this.mailSender.sendInvoiceAsync(
      invoice,
      sender,
      client,
      company,
      fileInfo,
    );

    return sendMailDto;
  }
}
