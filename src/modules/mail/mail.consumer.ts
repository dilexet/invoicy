import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MAIL_SENDER_QUEUE_NAME } from '../../constants/queue.constants';
import { MailService } from './mail.service';

@Processor(MAIL_SENDER_QUEUE_NAME)
export class MailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process()
  async process(job: Job<string>): Promise<boolean> {
    return await this.mailService.sendMailAsync(job.data);
  }
}
