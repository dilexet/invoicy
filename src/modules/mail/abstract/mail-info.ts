export interface IMailInfo {
  recipientName: string;
  recipientEmail: string;

  senderName: string;
  senderEmail: string;

  subject: string;
  templatePath: string;
  context: object;
  attachments: IAttachment[];
}

export interface IAttachment {
  filename: string;
  content?: any;
  path?: string;
  contentType?: string;
  cid?: string;
  encoding?: string;
  contentDisposition?: 'attachment' | 'inline' | undefined;
  href?: string;
}
