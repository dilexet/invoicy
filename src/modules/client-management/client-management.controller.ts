import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionModel } from '../../model/exception.model';
import { ClientViewModel } from './view-model/client.view-model';
import { CreateClientInfoDto } from './dto/create-client-info.dto';
import { ClientManagementService } from './client-management.service';

@ApiTags('Client management')
@Controller('api/client-management')
export class ClientManagementController {
  constructor(
    private readonly clientManagementService: ClientManagementService,
  ) {}

  @Post()
  @ApiBody({
    type: CreateClientInfoDto,
  })
  @ApiCreatedResponse({
    description: 'The client information has been successfully created.',
    type: ClientViewModel,
  })
  @ApiBadRequestResponse({
    description: 'The client information was not created.',
    type: ExceptionModel,
  })
  async create(
    @Body() createClientManagementDto: CreateClientInfoDto,
  ): Promise<ClientViewModel> {
    return await this.clientManagementService.createAsync(
      createClientManagementDto,
    );
  }
}
