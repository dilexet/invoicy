import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SendMailDto {
  @ApiProperty({
    type: String,
    default: '30ee2271-de03-4543-af69-548ee366b4c4',
    description: 'Invoice id',
  })
  @IsUUID(4)
  @IsNotEmpty()
  invoiceId: string;
}
