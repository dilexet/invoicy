import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entity/paymentEntity';
import { PaymentMapperProfile } from './mapper-profile/payment.mapper-profile';
import { CompletedWorkEntity } from '../../database/entity/completed-work.entity';
import { ClientEntity } from '../../database/entity/client.entity';

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
