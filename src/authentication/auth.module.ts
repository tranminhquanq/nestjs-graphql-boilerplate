import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthStrategiesModule } from './strategies/auth-strategies.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [AuthStrategiesModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
