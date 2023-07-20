import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailInfo } from '../modules/mail/abstract/mail-info';

@Injectable()
export class MailSender {
  constructor(private mailerService: MailerService) {}

  async sendInvoiceAsync(mailInfo: IMailInfo): Promise<any> {
    return await this.mailerService.sendMail({
      to: {
        name: mailInfo.recipientName,
        address: mailInfo.recipientEmail,
      },
      from: {
        name: mailInfo.senderName,
        address: mailInfo.senderEmail,
      },
      subject: mailInfo.subject,
      template: mailInfo.templatePath,
      context: {
        ...mailInfo.context,
      },
      attachments: mailInfo.attachments,
    });
  }
}
