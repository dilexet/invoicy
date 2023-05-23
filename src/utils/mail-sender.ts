import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { InvoiceEntity } from '../database/entity/invoice.entity';
import { ClientEntity } from '../database/entity/client.entity';
import { FileInfoModel } from '../model/file-info.model';

@Injectable()
export class MailSender {
  constructor(private mailerService: MailerService) {}

  async sendInvoiceAsync(
    invoice: InvoiceEntity,
    client: ClientEntity,
    fileInfo: FileInfoModel,
  ): Promise<any> {
    const fullName = `${client.firstName} ${client.lastName}`;
    return await this.mailerService.sendMail({
      to: {
        name: fullName,
        address: client.email,
      },
      from: {
        name: invoice.senderOrganizationName,
        address: `<${invoice.senderOrganizationName}@gmail.com>`,
      },
      subject: `Invoice #${invoice.invoiceNumber}`,
      text: `Hello ${fullName}. You can see detailed information about the invoice in the attached file.`,
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
