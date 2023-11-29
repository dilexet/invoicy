import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PaymentEntity,
  CompletedWorkEntity,
  ClientEntity,
} from '../../database';
import { PaymentMapperProfile } from './mapper-profile/payment.mapper-profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      PaymentEntity,
      CompletedWorkEntity,
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentMapperProfile],
})
export class PaymentModule {}
