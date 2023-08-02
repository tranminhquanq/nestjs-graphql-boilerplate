import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginModule } from './strategies/login/login.module';
import { RegisterModule } from './strategies/register/register.module';
import { jwtAsyncConfigOptions } from '@/config/app/third-party';
import { AuthGuard } from '@/common/guards/auth.guard';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync(jwtAsyncConfigOptions),
    LoginModule,
    RegisterModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
