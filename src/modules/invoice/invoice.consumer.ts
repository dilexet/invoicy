import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { INVOICE_GENERATE_QUEUE_NAME } from '../../constants/queue.constants';
import { eventManager } from '../../utils/event-manager';
import { InvoiceFileViewModel } from './view-model/invoice-file.view-model';
import { InvoiceGenerator } from './utils/invoice.generator';

@Processor(INVOICE_GENERATE_QUEUE_NAME)
export class InvoiceConsumer {
  constructor(private readonly invoiceGenerator: InvoiceGenerator) {}

  @Process()
  async process(job: Job<InvoiceFileViewModel>): Promise<void> {
    await this.invoiceGenerator.generateInvoice(job.data);
    eventManager.emit('invoiceGenerated');
  }
}
