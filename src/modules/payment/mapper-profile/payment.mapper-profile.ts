import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { CompletedWorkEntity } from '../../../database/entity/completed-work.entity';
import { PaymentEntity } from '../../../database/entity/paymentEntity';
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
        PaymentEntity,
        PaymentViewModel,
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
