import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateCompanyInfoDto {
  @ApiProperty({
    type: String,
    default: 'Twelvedevs',
    description: 'Company name',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @ApiProperty({
    type: String,
    default: '101 Main Street, San Francisco, CA 94105',
    description: 'Company address',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  address: string;

  @ApiProperty({
    type: String,
    default: '+375256669777',
    description: 'Company phone',
  })
  @IsPhoneNumber()
  @AutoMap()
  phone: string;
}
