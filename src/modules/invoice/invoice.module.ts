import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entity/payment.entity';
import { PdfGeneratorService } from '../../utils/pdf-generator.service';
import { HtmlTemplatesReader } from '../../utils/html-templates-reader';
import { FilePathHelper } from '../../utils/file-path-helper';
import { InvoiceMapperProfile } from './mapper-profile/invoice.mapper-profile';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { SenderEntity } from '../../database/entity/sender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, InvoiceEntity, SenderEntity])],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    PdfGeneratorService,
    HtmlTemplatesReader,
    FilePathHelper,
    InvoiceMapperProfile
  ],
})
export class InvoiceModule {}
