import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entity/paymentEntity';
import { PdfGeneratorService } from '../../utils/pdf-generator.service';
import { HtmlTemplatesReader } from '../../utils/html-templates-reader';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [InvoiceController],
  providers: [InvoiceService, PdfGeneratorService, HtmlTemplatesReader],
})
export class InvoiceModule {}
