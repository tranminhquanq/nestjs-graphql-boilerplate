import { Module } from '@nestjs/common';
import { UsersModule } from '@/models/user/users.module';
import { RegisterStrategiesService } from './register.service';

@Module({
  imports: [UsersModule],
  providers: [RegisterStrategiesService],
  exports: [RegisterStrategiesService],
})
export class RegisterStrategiesModule {}
