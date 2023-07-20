import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentViewModel } from './view-model/payment.view-model';
import { ExceptionModel } from '../../model/exception.model';
import { PaymentQuery } from './dto/payment-query';

@ApiTags('Payment')
@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiBody({
    type: CreatePaymentDto,
  })
  @ApiCreatedResponse({
    description: 'The payment has been successfully created.',
    type: PaymentViewModel,
  })
  @ApiBadRequestResponse({
    description: 'The payment was not created.',
    type: ExceptionModel,
  })
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentViewModel> {
    return await this.paymentService.createAsync(createPaymentDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Information about all payments was successfully received.',
    type: PaymentViewModel,
    isArray: true,
  })
  async getAll(@Query() payment?: PaymentQuery): Promise<PaymentViewModel[]> {
    return await this.paymentService.getAllAsync(payment);
  }
}
