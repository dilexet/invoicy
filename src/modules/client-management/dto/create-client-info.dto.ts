import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateClientInfoDto {
  @ApiProperty({
    type: String,
    default: 'John',
    description: 'Client first name',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  firstName: string;

  @ApiProperty({
    type: String,
    default: 'Smith',
    description: 'Client last name',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  lastName: string;

  @ApiProperty({
    type: String,
    default: 'user@gmail.com',
    description: 'Client email',
  })
  @IsEmail()
  @AutoMap()
  email: string;
}
