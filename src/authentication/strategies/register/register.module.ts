import { Module } from '@nestjs/common';
import { UserModule } from '@/models/user/user.module';
import { RegisterService } from './register.service';

@Module({
  imports: [UserModule],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
