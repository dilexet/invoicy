import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment/moment';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { InvoiceEntity } from '../database/entity/invoice.entity';
import { ClientEntity } from '../database/entity/client.entity';
import { FileInfoModel } from '../model/file-info.model';
import { SenderEntity } from '../database/entity/sender.entity';
import { CompanyEntity } from '../database/entity/company.entity';

@Injectable()
export class MailSender {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    private mailerService: MailerService,
  ) {}

  async sendInvoiceAsync(
    invoice: InvoiceEntity,
    sender: SenderEntity,
    client: ClientEntity,
    company: CompanyEntity,
    fileInfo: FileInfoModel,
  ): Promise<any> {
    const fullName = `${client.firstName} ${client.lastName}`;
    const invoiceDateFormat = this.config.get<string>('INVOICE_DATE_FORMAT');
    const invoiceDate = moment(invoice.invoiceDate).format(invoiceDateFormat);
    return await this.mailerService.sendMail({
      to: {
        name: fullName,
        address: client.email,
      },
      from: {
        name: sender.organization,
        address: sender.email,
      },
      subject: `Invoice #${invoice.invoiceNumber}`,
      template: './invoice.hbs',
      context: {
        fullName: fullName,
        invoiceNumber: invoice.invoiceNumber,
        clientCompany: company.name,
        invoiceDate: invoiceDate,
        senderEmail: sender.email,
        senderOrganization: sender.organization,
      },
      attachments: [
        {
          path: join(process.cwd(), fileInfo.filePath),
          filename: fileInfo.fileName,
          contentDisposition: 'attachment',
        },
      ],
    });
  }
}
