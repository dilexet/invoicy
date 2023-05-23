import { CompletedWorkViewModel } from './completed-work.view-model';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentViewModel {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  requestDate: string;

  @ApiProperty()
  completedWorks: CompletedWorkViewModel[];
}
