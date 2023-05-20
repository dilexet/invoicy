import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../../database/entity/company.entity';
import { CompanyViewModel } from './view-model/company.view-model';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';

@Injectable()
export class CompanyManagementService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(CompanyEntity)
    private companyEntityRepository: Repository<CompanyEntity>,
  ) {}

  async createAsync(
    createCompanyManagementDto: CreateCompanyInfoDto,
  ): Promise<CompanyViewModel> {
    if (
      (await this.companyEntityRepository.findOneBy({
        name: createCompanyManagementDto.name,
      })) !== null
    ) {
      throw new BadRequestException(
        'A company with this name has already been created',
      );
    }

    const companyEntityMapped = this.mapper.map(
      createCompanyManagementDto,
      CreateCompanyInfoDto,
      CompanyEntity,
    );

    const companyEntityCreated = await this.companyEntityRepository.save(
      companyEntityMapped,
    );

    const result = this.mapper.map(
      companyEntityCreated,
      CompanyEntity,
      CompanyViewModel,
    );

    return result;
  }
}
