import { Module } from '@nestjs/common';
import { FilePathHelper } from '../../utils/file-path-helper';
import { MailSender } from '../../utils/mail-sender';
import { MailService } from './mail.service';
import { MailMapperProfile } from './mapper-profile/mail.mapper-profile';
import { MailConsumer } from './mail.consumer';

@Module({
  providers: [
    MailService,
    MailConsumer,
    MailMapperProfile,
    FilePathHelper,
    MailSender,
  ],
})
export class MailModule {}
