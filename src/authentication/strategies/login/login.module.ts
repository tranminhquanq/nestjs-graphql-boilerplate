import { Module } from '@nestjs/common';
import { UsersModule } from '@/models/user/users.module';
import { LoginService } from './login.service';

@Module({
  imports: [UsersModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
