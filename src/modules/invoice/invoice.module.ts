import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { PaymentEntity } from '../../database/entity/payment.entity';
import { PdfGeneratorService } from '../../utils/pdf-generator.service';
import { HtmlTemplatesReader } from '../../utils/html-templates-reader';
import { FilePathHelper } from '../../utils/file-path-helper';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { SenderEntity } from '../../database/entity/sender.entity';
import {
  INVOICE_GENERATE_QUEUE_NAME,
  MAIL_SENDER_QUEUE_NAME,
} from '../../constants/queue.constants';
import { MailSender } from '../../utils/mail-sender';
import { MailConsumer } from '../mail/mail.consumer';
import { MailService } from '../mail/mail.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceHelpers } from './utils/invoice.helpers';
import { InvoiceConsumer } from './invoice.consumer';
import { InvoiceGenerator } from './utils/invoice.generator';
import { InvoiceMapperProfile } from './mapper-profile/invoice.mapper-profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, InvoiceEntity, SenderEntity]),
    BullModule.registerQueue(
      {
        name: MAIL_SENDER_QUEUE_NAME,
      },
      {
        name: INVOICE_GENERATE_QUEUE_NAME,
      },
    ),
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    PdfGeneratorService,
    HtmlTemplatesReader,
    FilePathHelper,
    InvoiceHelpers,
    InvoiceGenerator,
    InvoiceMapperProfile,
    MailConsumer,
    InvoiceConsumer,
    MailService,
    FilePathHelper,
    MailSender,
  ],
})
export class InvoiceModule {}
