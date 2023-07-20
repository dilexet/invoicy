import { ApiProperty } from '@nestjs/swagger';
import { SortType } from '../../../enum/SortType';

export class PaymentQuery {
  @ApiProperty({
    description: 'Client email',
    default: '',
    required: false,
    nullable: true,
  })
  email: string;

  @ApiProperty({
    description: 'Sort type (by date)',
    enum: SortType,
    enumName: 'SortType',
    required: false,
    nullable: true,
  })
  sortType: SortType;
}
