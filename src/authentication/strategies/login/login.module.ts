import { Module } from '@nestjs/common';
import { UserModule } from '@/models/user/user.module';
import { LoginService } from '@/authentication/strategies/login/login.service';

@Module({
  imports: [UserModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
