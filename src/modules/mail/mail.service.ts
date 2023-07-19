import { Injectable } from '@nestjs/common';
import { FilePathHelper } from '../../utils/file-path-helper';
import { MailSender } from '../../utils/mail-sender';
import { MailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(
    private filePathHelper: FilePathHelper,
    private mailSender: MailSender,
  ) {}

  async sendMailAsync(mailDto: MailDto): Promise<boolean> {
    const fileInfo = this.filePathHelper.pdfFilePathGeneration(
      mailDto.invoiceNumber,
    );

    try {
      const result = await this.mailSender.sendInvoiceAsync(mailDto, fileInfo);

      return !(result && result.rejected.length > 0);
    } catch (error) {
      return false;
    }
  }
}
