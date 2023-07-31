import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginModule } from './strategies/login/login.module';
import { RegisterModule } from './strategies/register/register.module';

@Module({
  controllers: [AuthController],
  imports: [LoginModule, RegisterModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
