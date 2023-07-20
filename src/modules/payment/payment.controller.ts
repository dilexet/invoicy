import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentViewModel } from './view-model/payment.view-model';
import { ExceptionModel } from '../../model/exception.model';

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
  @ApiQuery({
    name: 'payment',
    description: 'Payment client email',
    type: String,
    required: false,
  })
  @ApiOkResponse({
    description: 'Information about all payments was successfully received.',
    type: PaymentViewModel,
    isArray: true,
  })
  async getAll(
    @Query('payment') payment?: string,
  ): Promise<PaymentViewModel[]> {
    return await this.paymentService.getAllAsync(payment);
  }
}
