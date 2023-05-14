import { ApiProperty } from '@nestjs/swagger';

export class ExceptionModel {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string | object;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;
}
