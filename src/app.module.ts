import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/authentication/auth.module';
import { HttpExceptionFilter } from '@/common/exceptions/http-exception.filter';
import {
  apolloDriverConfigOptions,
  configModuleOptions,
  throttlerAsyncOptions,
} from '@/config/app/third-party';
import resolvers from '@/resolvers';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    GraphQLModule.forRoot(apolloDriverConfigOptions),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    ...resolvers,
  ],
})
export class AppModule {}
