import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { FileInfoModel } from '../model/file-info.model';
import { MailDto } from '../modules/mail/mail.dto';

@Injectable()
export class MailSender {
  constructor(private mailerService: MailerService) {}

  async sendInvoiceAsync(
    mailDto: MailDto,
    fileInfo: FileInfoModel,
  ): Promise<any> {
    return await this.mailerService.sendMail({
      to: {
        name: mailDto.clientFullName,
        address: mailDto.clientEmail,
      },
      from: {
        name: mailDto.senderOrganization,
        address: mailDto.senderEmail,
      },
      subject: `Invoice #${mailDto.invoiceNumber}`,
      template: './invoice.hbs',
      context: {
        fullName: mailDto.clientFullName,
        invoiceNumber: mailDto.invoiceNumber,
        clientCompany: mailDto.companyName,
        invoiceDate: mailDto.invoiceDate,
        senderEmail: mailDto.senderEmail,
        senderOrganization: mailDto.senderOrganization,
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
