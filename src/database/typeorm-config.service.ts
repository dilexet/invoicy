import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { InvoiceEntity } from './entity/invoice.entity';
import { CompletedWorkEntity } from './entity/completed-work.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      database: this.config.get<string>('DB_NAME'),
      username: this.config.get<string>('DB_USERNAME'),
      password: this.config.get<string>('DB_PASSWORD'),
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true,
      autoLoadEntities: true
    };
  }
}
