import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { CompanyViewModel } from '../view-model/company.view-model';
import { CompanyEntity } from '../../../database/entity/company.entity';
import { CreateCompanyInfoDto } from '../dto/create-company-info.dto';
import { ClientEntity } from '../../../database/entity/client.entity';
import { ClientViewModel } from '../../client-management/view-model/client.view-model';

@Injectable()
export class CompanyMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateCompanyInfoDto, CompanyEntity);
      createMap(mapper, ClientEntity, ClientViewModel);
      createMap(mapper, CompanyEntity, CompanyViewModel);
    };
  }
}
