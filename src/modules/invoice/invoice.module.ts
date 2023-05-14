import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { InvoiceMapperProfile } from './mapper-profile/invoice.mapper-profile';
import { CompletedWorkEntity } from '../../database/entity/completed-work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity, CompletedWorkEntity])],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceMapperProfile],
})
export class InvoiceModule {}
