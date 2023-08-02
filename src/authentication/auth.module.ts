import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/authentication/auth.service';
import { AuthController } from '@/authentication/auth.controller';
import { LoginModule } from '@/authentication/strategies/login/login.module';
import { RegisterModule } from '@/authentication/strategies/register/register.module';
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
