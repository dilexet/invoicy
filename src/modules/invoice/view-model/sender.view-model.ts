import { AutoMap } from '@automapper/classes';

export class SenderViewModel {
  @AutoMap()
  organization: string;

  @AutoMap()
  address: string;

  @AutoMap()
  email: string;

  @AutoMap()
  phone: string;
}
