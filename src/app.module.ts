import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthController } from '@/authentication/auth.controller';
import { AuthModule } from '@/authentication/auth.module';
import { HttpExceptionFilter } from '@/common/exceptions/http-exception.filter';
import {
  configModuleOptions,
  throttlerAsyncOptions,
} from '@/config/app/third-party';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
