import { Module } from '@nestjs/common';
import { UserService } from '@/models/user/user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
