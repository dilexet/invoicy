import { IAttachment, IMailInfo } from '../abstract/mail-info';

export class MailInfoDto implements IMailInfo {
  recipientName: string;
  recipientEmail: string;

  senderName: string;
  senderEmail: string;

  subject: string;
  context: MailContext;

  templatePath: string;
  attachments: IAttachment[];
}

export class MailContext {
  fullName: string;
  invoiceNumber: number;
  clientCompany: string;
  invoiceDate: string;
  senderEmail: string;
  senderOrganization: string;
}
