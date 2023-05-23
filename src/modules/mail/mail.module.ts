import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { FilePathHelper } from '../../utils/file-path-helper';
import { MailSender } from '../../utils/mail-sender';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  controllers: [MailController],
  providers: [MailService, FilePathHelper, MailSender],
})
export class MailModule {}
