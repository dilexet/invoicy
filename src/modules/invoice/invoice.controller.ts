import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { GenerateInvoiceDto } from './dto/generate-invoice.dto';
import { ExceptionModel } from '../../model/exception.model';

@ApiTags('Invoice')
@Controller('api/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiBody({
    type: GenerateInvoiceDto,
  })
  // @ApiCreatedResponse({
  //   description: 'The payment has been successfully created.',
  //   type: PaymentViewModel,
  // })
  @ApiBadRequestResponse({
    description: 'The invoice was not generate.',
    type: ExceptionModel,
  })
  async generate(@Body() generateInvoiceDto: GenerateInvoiceDto) {
    return await this.invoiceService.generateAsync(generateInvoiceDto);
  }
}
