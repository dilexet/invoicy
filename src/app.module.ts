import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { InvoiceModule } from './invoice/invoice.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    InvoiceModule,
  ],
})
export class AppModule {}
