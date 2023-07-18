import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MAIL_SENDER_QUEUE_NAME } from '../../constants/queue.constants';
import { MailService } from './mail.service';
import { MailInfoDto } from './mail-info.dto';
import { eventManager } from '../../utils/event-manager';

@Processor(MAIL_SENDER_QUEUE_NAME)
export class MailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process()
  async process(job: Job<MailInfoDto>): Promise<boolean> {
    await new Promise<void>((resolve) => {
      eventManager.once('invoiceGenerated', () => {
        resolve();
      });
    });
    return await this.mailService.sendMailAsync(job.data);
  }
}
