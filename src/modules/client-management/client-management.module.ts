import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../database/entity/client.entity';
import { ClientManagementService } from './client-management.service';
import { ClientManagementController } from './client-management.controller';
import { ClientMapperProfile } from './mapper-profile/client.mapper-profile';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientManagementController],
  providers: [ClientManagementService, ClientMapperProfile],
})
export class ClientManagementModule {}
