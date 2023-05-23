import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { PaymentModule } from './modules/payment/payment.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ClientManagementModule } from './modules/client-management/client-management.module';
import { CompanyManagementModule } from './modules/company-management/company-management.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    PaymentModule,
    ClientManagementModule,
    CompanyManagementModule,
    InvoiceModule,
    MailModule,
  ],
})
export class AppModule {}
