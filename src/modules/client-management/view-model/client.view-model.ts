import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class ClientViewModel {
  @ApiProperty()
  @AutoMap()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  email: string;
}
