import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../database/entity/client.entity';
import { ClientManagementService } from './client-management.service';
import { ClientManagementController } from './client-management.controller';
import { ClientMapperProfile } from './mapper-profile/client.mapper-profile';
import { CompanyEntity } from '../../database/entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, CompanyEntity])],
  controllers: [ClientManagementController],
  providers: [ClientManagementService, ClientMapperProfile],
})
export class ClientManagementModule {}
