import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { GenerateInvoiceDto } from '../dto/generate-invoice.dto';
import { SenderViewModel } from '../view-model/sender.view-model';
import { InvoiceViewModel } from '../view-model/invoice.view-model';
import { InvoiceFileViewModel } from '../view-model/invoice-file.view-model';

@Injectable()
export class InvoiceMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, GenerateInvoiceDto, SenderViewModel);
      createMap(
        mapper,
        InvoiceFileViewModel,
        InvoiceViewModel,
        forMember(
          (dest) => dest.clientEmail,
          mapFrom((source) => source.client.email),
        ),
        forMember(
          (dest) => dest.senderOrganizationName,
          mapFrom((source) => source.sender.organization),
        ),
      );
    };
  }
}
