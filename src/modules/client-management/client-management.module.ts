import { Module } from '@nestjs/common';
import { ClientManagementService } from './client-management.service';
import { ClientManagementController } from './client-management.controller';

@Module({
  controllers: [ClientManagementController],
  providers: [ClientManagementService]
})
export class ClientManagementModule {}
