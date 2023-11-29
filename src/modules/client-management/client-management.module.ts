import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity, CompanyEntity } from '../../database';
import { ClientManagementService } from './client-management.service';
import { ClientManagementController } from './client-management.controller';
import { ClientMapperProfile } from './mapper-profile/client.mapper-profile';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, CompanyEntity])],
  controllers: [ClientManagementController],
  providers: [ClientManagementService, ClientMapperProfile],
})
export class ClientManagementModule {}
