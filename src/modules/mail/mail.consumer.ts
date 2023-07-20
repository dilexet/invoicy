import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Process, Processor } from '@nestjs/bull';
import { eventManager } from '../../utils/event-manager';
import { MAIL_SENDER_QUEUE_NAME } from '../../constants/queue.constants';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Processor(MAIL_SENDER_QUEUE_NAME)
export class MailConsumer {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  @Process()
  async process(job: Job<MailDto>): Promise<boolean> {
    await new Promise<void>((resolve) => {
      eventManager.once(
        this.configService.get<string>('INVOICE_GENERATION_EVENT_NAME'),
        () => {
          resolve();
        },
      );
    });
    return await this.mailService.sendMailAsync(job.data);
  }
}
