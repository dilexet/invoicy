import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ClientManagementModule } from './modules/client-management/client-management.module';
import { CompanyManagementModule } from './modules/company-management/company-management.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MailerConfig } from './config/mailer.config';
import { BullConfig } from './config/bull.config';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MailerModule.forRootAsync({ useClass: MailerConfig }),
    BullModule.forRootAsync({ useClass: BullConfig }),
    PaymentModule,
    ClientManagementModule,
    CompanyManagementModule,
    InvoiceModule,
    MailModule
  ],
})
export class AppModule {}
