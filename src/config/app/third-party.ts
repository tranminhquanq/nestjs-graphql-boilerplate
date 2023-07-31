import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import {
  ConfigModuleOptions,
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
};

export const throttlerAsyncOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    ttl: config.get('THROTTLE_TTL'),
    limit: config.get('THROTTLE_LIMIT'),
    ignoreUserAgents: [/googlebot/gi, new RegExp('bingbot', 'gi')],
  }),
};
