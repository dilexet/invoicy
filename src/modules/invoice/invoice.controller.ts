import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';

@ApiTags('Invoice')
@Controller('api/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async generate() {
    return await this.invoiceService.generateAsync();
  }
}
