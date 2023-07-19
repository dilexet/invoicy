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
import { SenderEntity } from '../../../database/entity/sender.entity';
import { MailDto } from '../../mail/mail.dto';

@Injectable()
export class InvoiceMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, GenerateInvoiceDto, SenderViewModel);
      createMap(mapper, GenerateInvoiceDto, SenderEntity);
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

      createMap(
        mapper,
        InvoiceFileViewModel,
        MailDto,
        forMember(
          (dest) => dest.invoiceNumber,
          mapFrom((source) => source.invoiceNumber),
        ),
        forMember(
          (dest) => dest.invoiceDate,
          mapFrom((source) => source.invoiceDate),
        ),
        forMember(
          (dest) => dest.clientFullName,
          mapFrom(
            (source) => `${source.client.firstName} ${source.client.lastName}`,
          ),
        ),
        forMember(
          (dest) => dest.clientEmail,
          mapFrom((source) => source.client.email),
        ),
        forMember(
          (dest) => dest.senderOrganization,
          mapFrom((source) => source.sender.organization),
        ),
        forMember(
          (dest) => dest.senderEmail,
          mapFrom((source) => source.sender.email),
        ),
        forMember(
          (dest) => dest.companyName,
          mapFrom((source) => source.company.name),
        ),
      );
    };
  }
}
