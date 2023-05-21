import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { GenerateInvoiceDto } from '../dto/generate-invoice.dto';
import { SenderViewModel } from '../view-model/sender.view-model';

@Injectable()
export class InvoiceMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, GenerateInvoiceDto, SenderViewModel);
    };
  }
}
