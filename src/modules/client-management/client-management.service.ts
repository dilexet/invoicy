import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../database/entity/client.entity';
import { CreateClientInfoDto } from './dto/create-client-info.dto';
import { ClientViewModel } from './view-model/client.view-model';
import { CompanyEntity } from '../../database/entity/company.entity';

@Injectable()
export class ClientManagementService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(ClientEntity)
    private clientEntityRepository: Repository<ClientEntity>,
    @InjectRepository(CompanyEntity)
    private companyEntityRepository: Repository<CompanyEntity>,
  ) {}

  // TODO: email verify when started use mailgun
  async createAsync(
    createClientManagementDto: CreateClientInfoDto,
  ): Promise<ClientViewModel> {
    if (
      (await this.clientEntityRepository.findOneBy({
        email: createClientManagementDto.email,
      })) !== null
    ) {
      throw new BadRequestException(
        'A client with this email has already been created',
      );
    }

    const clientCompany = await this.companyEntityRepository.findOneBy({
      id: createClientManagementDto.companyId,
    });

    if (!clientCompany) {
      throw new BadRequestException('This company does not exist');
    }

    const clientEntity = this.mapper.map(
      createClientManagementDto,
      CreateClientInfoDto,
      ClientEntity,
    );

    clientEntity.company = Promise.resolve(clientCompany);

    const clientEntityCreated = await this.clientEntityRepository.save(
      clientEntity,
    );

    return this.mapper.map(clientEntityCreated, ClientEntity, ClientViewModel);
  }
}
