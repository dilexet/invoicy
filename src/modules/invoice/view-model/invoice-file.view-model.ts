import { ClientViewModel } from '../../client-management/view-model/client.view-model';
import { CompanyViewModel } from '../../company-management/view-model/company.view-model';
import { CompletedWorkViewModel } from '../../payment/view-model/completed-work.view-model';
import { SenderViewModel } from './sender.view-model';

export class InvoiceFileViewModel {
  client: ClientViewModel;
  company: CompanyViewModel;
  completedWorks: CompletedWorkViewModel[];
  totalPrice: string;
  invoiceNumber: number;
  invoiceDate: string;
  sender: SenderViewModel;
}
