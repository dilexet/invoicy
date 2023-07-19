import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MAIL_SENDER_QUEUE_NAME } from '../../constants/queue.constants';
import { MailService } from './mail.service';
import { MailInfoDto } from './mail-info.dto';
import { eventManager } from '../../utils/event-manager';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Processor(MAIL_SENDER_QUEUE_NAME)
export class MailConsumer {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  @Process()
  async process(job: Job<MailInfoDto>): Promise<boolean> {
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
