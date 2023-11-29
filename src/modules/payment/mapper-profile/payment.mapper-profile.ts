import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  afterMap,
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { CompletedWorkEntity, PaymentEntity } from '../../../database';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CompletedWorkDto } from '../dto/completed-work.dto';
import { CompletedWorkViewModel } from '../view-model/completed-work.view-model';
import { PaymentViewModel } from '../view-model/payment.view-model';

@Injectable()
export class PaymentMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CompletedWorkDto, CompletedWorkEntity);
      createMap(
        mapper,
        CreatePaymentDto,
        PaymentEntity,
        forMember((dest) => dest.completedWorks, ignore()),
        afterMap(async (source, destination) => {
          const completedWorkEntities = mapper.mapArray(
            source.completedWorks,
            CompletedWorkDto,
            CompletedWorkEntity,
          );

          destination.completedWorks = Promise.resolve(completedWorkEntities);
        }),
      );

      createMap(mapper, CompletedWorkEntity, CompletedWorkViewModel);
      createMap(
        mapper,
        PaymentEntity,
        PaymentViewModel,
        forMember((dest) => dest.completedWorks, ignore()),
        forMember(
          (dest) => dest.requestDate,
          mapFrom((source) => source.requestDate.toUTCString()),
        ),
        afterMap(async (source, destination) => {
          const completedWorks = await source.completedWorks;
          const client = await source.client;
          destination.email = client.email;
          destination.completedWorks = mapper.mapArray(
            completedWorks,
            CompletedWorkEntity,
            CompletedWorkViewModel,
          );
        }),
      );
    };
  }
}
