import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../../database';
import { CompanyMapperProfile } from './mapper-profile/company.mapper-profile';
import { CompanyManagementService } from './company-management.service';
import { CompanyManagementController } from './company-management.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyManagementController],
  providers: [CompanyManagementService, CompanyMapperProfile],
})
export class CompanyManagementModule {}
