import { Module } from '@nestjs/common';
import { UsersModule } from '@/models/user/users.module';
import { RegisterService } from './register.service';

@Module({
  imports: [UsersModule],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
