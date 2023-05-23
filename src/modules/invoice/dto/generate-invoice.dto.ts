import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class GenerateInvoiceDto {
  @ApiProperty({
    type: String,
    default: 'twelvedevs@gmail.com',
    description: 'Sender email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty({
    type: String,
    default: 'Twelvedevs',
    description: 'Sender organization name',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  organization: string;

  @ApiProperty({
    type: String,
    default: '101 Main Street, San Francisco, CA 94105',
    description: 'Sender organization address',
  })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  address: string;

  @ApiProperty({
    type: String,
    default: '+375256669777',
    description: 'Sender organization phone',
  })
  @IsPhoneNumber()
  @AutoMap()
  phone: string;

  @ApiProperty({
    type: String,
    default: '5a66dd65-ba37-4ea8-a505-fc6f4a116b33',
    description: 'Payment id',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  paymentId: string;
}
