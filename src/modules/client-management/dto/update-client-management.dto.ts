import { PartialType } from '@nestjs/swagger';
import { CreateClientManagementDto } from './create-client-management.dto';

export class UpdateClientManagementDto extends PartialType(CreateClientManagementDto) {}
