import { Module } from '@nestjs/common';
import { UsersModule } from '@/models/user/users.module';
import { LoginStrategiesService } from './login.service';

@Module({
  imports: [UsersModule],
  providers: [LoginStrategiesService],
  exports: [LoginStrategiesService],
})
export class LoginStrategiesModule {}
