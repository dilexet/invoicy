import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.configService.get<string>('EMAIL_HOST'),
        port: this.configService.get<number>('EMAIL_PORT'),
        secure: false,
        auth: {
          user: this.configService.get<string>('EMAIL_AUTH_USER'),
          pass: this.configService.get<string>('EMAIL_AUTH_PASS'),
        },
      },
      template: {
        dir: join(
          process.cwd(),
          this.configService.get<string>('BUILD_DIRECTORY_NAME'),
          this.configService.get<string>('TEMPLATES_DIRECTORY_NAME'),
        ),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
