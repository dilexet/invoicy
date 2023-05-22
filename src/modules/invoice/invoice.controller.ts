import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { GenerateInvoiceDto } from './dto/generate-invoice.dto';
import { ExceptionModel } from '../../model/exception.model';
import { InvoiceViewModel } from './view-model/invoice.view-model';

@ApiTags('Invoice')
@Controller('api/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiBody({
    type: GenerateInvoiceDto,
  })
  @ApiCreatedResponse({
    description: 'The invoice has been successfully generated.',
    type: InvoiceViewModel,
  })
  @ApiBadRequestResponse({
    description: 'The invoice was not generate.',
    type: ExceptionModel,
  })
  async generate(
    @Body() generateInvoiceDto: GenerateInvoiceDto,
  ): Promise<InvoiceViewModel> {
    return await this.invoiceService.generateAsync(generateInvoiceDto);
  }
}
