import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { MAIL_SENDER_QUEUE_NAME } from '../../constants/queue.constants';
import { SendMailDto } from '../mail/dto/send-mail.dto';
import { MailService } from '../mail/mail.service';

@Processor(MAIL_SENDER_QUEUE_NAME)
export class InvoiceConsumer {
  private readonly logger = new Logger();

  constructor(private readonly mailService: MailService) {}

  @Process()
  async process(job: Job<SendMailDto>) {
    this.logger.log(JSON.stringify(job.data.invoiceId));
    this.logger.log(
      JSON.stringify(await this.mailService.sendMailAsync(job.data)),
    );
    return job;
  }
}
