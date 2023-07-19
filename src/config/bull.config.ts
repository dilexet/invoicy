import { Inject, Injectable } from '@nestjs/common';
import {
  BullModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfig implements SharedBullConfigurationFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
      },
    };
  }
}
