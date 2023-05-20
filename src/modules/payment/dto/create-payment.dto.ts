import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CompletedWorkDto } from './completed-work.dto';
import { AutoMap } from '@automapper/classes';

export class CreatePaymentDto {
  @ApiProperty({
    type: String,
    default: 'user@gmail.com',
    description: 'Client email',
  })
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty({
    type: CompletedWorkDto,
    isArray: true,
    description: 'List of completed works',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CompletedWorkDto)
  completedWorks: CompletedWorkDto[];
}
