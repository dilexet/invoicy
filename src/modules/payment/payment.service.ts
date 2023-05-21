import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entity/paymentEntity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentViewModel } from './view-model/payment.view-model';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ClientEntity } from '../../database/entity/client.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(PaymentEntity)
    private paymentEntityRepository: Repository<PaymentEntity>,
    @InjectRepository(ClientEntity)
    private clientEntityRepository: Repository<ClientEntity>,
  ) {}

  async createAsync(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentViewModel> {
    const client = await this.clientEntityRepository.findOneBy({
      email: createPaymentDto.email,
    });

    if (!client) {
      throw new BadRequestException('Client with this email does not exist');
    }

    const paymentEntity = await this.mapper.mapAsync(
      createPaymentDto,
      CreatePaymentDto,
      PaymentEntity,
    );

    paymentEntity.client = Promise.resolve(client);

    const paymentEntityCreated = await this.paymentEntityRepository.save(
      paymentEntity,
    );

    return await this.mapper.mapAsync(
      paymentEntityCreated,
      PaymentEntity,
      PaymentViewModel,
    );
  }
}
