import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
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

  @Get()
  @ApiQuery({
    name: 'client',
    description: 'Client first name, last name or email',
    type: String,
    required: false,
  })
  @ApiOkResponse({
    description: 'Information about all clients was successfully received.',
    type: ClientViewModel,
    isArray: true,
  })
  async getAll(@Query('client') client?: string): Promise<ClientViewModel[]> {
    return await this.clientManagementService.getAllAsync(client);
  }
}
