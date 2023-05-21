import { CompletedWorkViewModel } from './completed-work.view-model';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentViewModel {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  invoiceNumber: number;

  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  completedWorks: CompletedWorkViewModel[];
}
