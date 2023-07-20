import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { MailContext, MailInfoDto } from '../dto/mail-info.dto';
import { MailDto } from '../dto/mail.dto';

@Injectable()
export class MailMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        MailDto,
        MailContext,
        forMember(
          (dest) => dest.fullName,
          mapFrom((source) => source.clientFullName),
        ),
        forMember(
          (dest) => dest.invoiceNumber,
          mapFrom((source) => source.invoiceNumber),
        ),
        forMember(
          (dest) => dest.clientCompany,
          mapFrom((source) => source.companyName),
        ),
        forMember(
          (dest) => dest.invoiceDate,
          mapFrom((source) => source.invoiceDate),
        ),
        forMember(
          (dest) => dest.senderEmail,
          mapFrom((source) => source.senderEmail),
        ),
        forMember(
          (dest) => dest.senderOrganization,
          mapFrom((source) => source.senderOrganization),
        ),
      );

      createMap(
        mapper,
        MailDto,
        MailInfoDto,
        forMember((dest) => dest.attachments, ignore()),
        forMember((dest) => dest.templatePath, ignore()),
        forMember(
          (dest) => dest.recipientName,
          mapFrom((source) => source.clientFullName),
        ),
        forMember(
          (dest) => dest.recipientEmail,
          mapFrom((source) => source.clientEmail),
        ),
        forMember(
          (dest) => dest.senderName,
          mapFrom((source) => source.senderOrganization),
        ),
        forMember(
          (dest) => dest.senderEmail,
          mapFrom((source) => source.senderEmail),
        ),
        forMember(
          (dest) => dest.subject,
          mapFrom((source) => `Invoice #${source.invoiceNumber}`),
        ),

        forMember(
          (dest) => dest.context,
          mapFrom((source) => mapper.map(source, MailDto, MailContext)),
        ),
      );
    };
  }
}
