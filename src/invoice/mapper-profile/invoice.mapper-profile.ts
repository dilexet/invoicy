import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { CompletedWorkEntity } from '../../database/entity/completed-work.entity';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { CompletedWorkDto } from '../dto/completed-work.dto';
import { CompletedWorkViewModel } from '../view-model/completed-work.view-model';
import { InvoiceViewModel } from '../view-model/invoice.view-model';

@Injectable()
export class InvoiceMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CompletedWorkDto, CompletedWorkEntity);
      createMap(
        mapper,
        CreateInvoiceDto,
        InvoiceEntity,
        forMember(
          (dest) => dest.completedWorks,
          mapFrom((source) =>
            mapper.mapArray(
              source.completedWorks,
              CompletedWorkDto,
              CompletedWorkEntity,
            ),
          ),
        ),
      );

      createMap(mapper, CompletedWorkEntity, CompletedWorkViewModel);
      createMap(
        mapper,
        InvoiceEntity,
        InvoiceViewModel,
        forMember(
          (dest) => dest.completedWorks,
          mapFrom((source) =>
            mapper.mapArray(
              source.completedWorks,
              CompletedWorkEntity,
              CompletedWorkViewModel,
            ),
          ),
        ),
      );
    };
  }
}
