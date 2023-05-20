import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entity/paymentEntity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentViewModel } from './view-model/payment.view-model';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class PaymentService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(PaymentEntity)
    private paymentEntityRepository: Repository<PaymentEntity>,
  ) {}

  async createAsync(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentViewModel> {
    const paymentEntity = this.mapper.map(
      createPaymentDto,
      CreatePaymentDto,
      PaymentEntity,
    );
    const paymentEntityCreated = await this.paymentEntityRepository.save(
      paymentEntity,
    );

    return this.mapper.map(
      paymentEntityCreated,
      PaymentEntity,
      PaymentViewModel,
    );
  }
}
