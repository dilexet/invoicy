import { Injectable } from '@nestjs/common';
import { CreateClientManagementDto } from './dto/create-client-management.dto';
import { UpdateClientManagementDto } from './dto/update-client-management.dto';

@Injectable()
export class ClientManagementService {
  create(createClientManagementDto: CreateClientManagementDto) {
    return 'This action adds a new clientManagement';
  }

  findAll() {
    return `This action returns all clientManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientManagement`;
  }

  update(id: number, updateClientManagementDto: UpdateClientManagementDto) {
    return `This action updates a #${id} clientManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientManagement`;
  }
}
