import { Injectable } from '@nestjs/common';
import { usersMock } from '@/mocks/user';

@Injectable()
export class UserService {
  private users = usersMock;

  async findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
