import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceViewModel } from './view-model/invoice.view-model';
import { ExceptionModel } from '../../model/exception.model';

@ApiTags('Invoice')
@Controller('api/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiBody({
    type: CreateInvoiceDto,
  })
  @ApiCreatedResponse({
    description: 'The invoice has been successfully created.',
    type: InvoiceViewModel,
  })
  @ApiBadRequestResponse({
    description: 'The invoice was not created.',
    type: ExceptionModel
  })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.createAsync(createInvoiceDto);
  }
}
