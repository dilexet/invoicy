import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MAIL_SENDER_QUEUE_NAME } from '../../constants/queue.constants';
import { MailService } from './mail.service';
import { MailInfoDto } from './mail-info.dto';

@Processor(MAIL_SENDER_QUEUE_NAME)
export class MailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process()
  async process(job: Job<MailInfoDto>): Promise<boolean> {
    return await this.mailService.sendMailAsync(job.data);
  }
}
