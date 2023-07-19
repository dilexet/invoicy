import { ClientViewModel } from '../../client-management/view-model/client.view-model';
import { CompanyViewModel } from '../../company-management/view-model/company.view-model';
import { CompletedWorkViewModel } from '../../payment/view-model/completed-work.view-model';
import { SenderViewModel } from './sender.view-model';
import { AutoMap } from '@automapper/classes';

export class InvoiceFileViewModel {
  client: ClientViewModel;

  company: CompanyViewModel;

  completedWorks: CompletedWorkViewModel[];

  @AutoMap()
  invoiceId: string;

  @AutoMap()
  invoiceNumber: number;

  @AutoMap()
  totalPrice: string;

  @AutoMap()
  invoiceDate: string;

  @AutoMap()
  requestDate: string;

  sender: SenderViewModel;
}
