import { join } from 'path';
import * as process from 'process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ClientManagementModule } from './modules/client-management/client-management.module';
import { CompanyManagementModule } from './modules/company-management/company-management.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { MailModule } from './modules/mail/mail.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS,
        },
      },
      template: {
        dir: join(process.cwd(), 'dist', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    PaymentModule,
    ClientManagementModule,
    CompanyManagementModule,
    InvoiceModule,
    MailModule,
  ],
})
export class AppModule {}
