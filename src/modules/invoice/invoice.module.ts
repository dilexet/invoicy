import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { PaymentEntity, InvoiceEntity, SenderEntity } from '../../database';
import {
  INVOICE_GENERATE_QUEUE_NAME,
  MAIL_SENDER_QUEUE_NAME,
} from '../../constants/queue.constants';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceHelpers } from './utils/invoice.helpers';
import { InvoiceConsumer } from './invoice.consumer';
import { InvoiceMapperProfile } from './mapper-profile/invoice.mapper-profile';
import { InvoiceGenerator } from './utils/invoice.generator';
import { FilePathHelper } from '../../utils/file-path-helper';
import { PdfGeneratorService } from '../../utils/pdf-generator.service';
import { HtmlTemplatesReader } from '../../utils/html-templates-reader';

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
    InvoiceHelpers,
    InvoiceMapperProfile,
    InvoiceConsumer,
    FilePathHelper,
    InvoiceGenerator,
    HtmlTemplatesReader,
    PdfGeneratorService,
  ],
})
export class InvoiceModule {}
