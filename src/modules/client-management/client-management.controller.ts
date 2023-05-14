import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientManagementService } from './client-management.service';
import { CreateClientManagementDto } from './dto/create-client-management.dto';
import { UpdateClientManagementDto } from './dto/update-client-management.dto';

@Controller('client-management')
export class ClientManagementController {
  constructor(private readonly clientManagementService: ClientManagementService) {}

  @Post()
  create(@Body() createClientManagementDto: CreateClientManagementDto) {
    return this.clientManagementService.create(createClientManagementDto);
  }

  @Get()
  findAll() {
    return this.clientManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientManagementDto: UpdateClientManagementDto) {
    return this.clientManagementService.update(+id, updateClientManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientManagementService.remove(+id);
  }
}
