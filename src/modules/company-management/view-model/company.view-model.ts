import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class CompanyViewModel {
  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  address: string;

  @ApiProperty()
  @AutoMap()
  phone: string;
}
