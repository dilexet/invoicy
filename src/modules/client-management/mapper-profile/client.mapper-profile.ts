import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { CreateClientInfoDto } from '../dto/create-client-info.dto';
import { ClientEntity } from '../../../database/entity/client.entity';
import { ClientViewModel } from '../view-model/client.view-model';

@Injectable()
export class ClientMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateClientInfoDto, ClientEntity);
      createMap(mapper, ClientEntity, ClientViewModel);
    };
  }
}
