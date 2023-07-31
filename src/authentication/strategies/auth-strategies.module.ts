import { Module } from '@nestjs/common';
import { AuthStrategiesService } from './auth-strategies.service';
import { LoginStrategiesModule } from './login/login.module';
import { RegisterStrategiesModule } from './register/register.module';

@Module({
  imports: [LoginStrategiesModule, RegisterStrategiesModule],
  providers: [AuthStrategiesService],
  exports: [AuthStrategiesService],
})
export class AuthStrategiesModule {}
