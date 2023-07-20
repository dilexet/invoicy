import { Inject, Injectable } from '@nestjs/common';
import { FilePathHelper } from '../../utils/file-path-helper';
import { MailSender } from '../../utils/mail-sender';
import { MailDto } from './dto/mail.dto';
import { MailInfoDto } from './dto/mail-info.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    @InjectMapper() private readonly mapper: Mapper,
    private filePathHelper: FilePathHelper,
    private mailSender: MailSender,
  ) {
  }

  async sendMailAsync(mailDto: MailDto): Promise<boolean> {
    const fileInfo = this.filePathHelper.pdfFilePathGeneration(
      mailDto.invoiceNumber,
    );

    const mailInfo: MailInfoDto = this.mapper.map(
      mailDto,
      MailDto,
      MailInfoDto,
    );

    mailInfo.attachments = [
      {
        path: join(process.cwd(), fileInfo.filePath),
        filename: fileInfo.fileName,
        contentDisposition: 'attachment',
      },
    ];

    mailInfo.templatePath = this.configService.get<string>(
      'INVOICE_MAIL_TEMPLATE_PATH',
    );

    try {
      const result = await this.mailSender.sendInvoiceAsync(mailInfo);

      return !(result && result.rejected.length > 0);
    } catch (error) {
      return false;
    }
  }
}
