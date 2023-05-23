import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class InvoiceViewModel {
  @ApiProperty()
  @AutoMap()
  invoiceNumber: number;

  @ApiProperty()
  @AutoMap()
  totalPrice: string;

  @ApiProperty()
  @AutoMap()
  invoiceDate: string;

  @ApiProperty()
  @AutoMap()
  requestDate: string;

  @ApiProperty()
  clientEmail: string;

  @ApiProperty()
  senderOrganizationName: string;
}
