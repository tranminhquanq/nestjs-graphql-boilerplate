import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginStrategiesModule } from './strategies/login/login.module';
import { RegisterStrategiesModule } from './strategies/register/register.module';

@Module({
  controllers: [AuthController],
  imports: [LoginStrategiesModule, RegisterStrategiesModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
