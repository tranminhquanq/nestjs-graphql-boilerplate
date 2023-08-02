import { Request } from 'express';
import { get } from 'lodash';
import { UserService } from '@/models/user/user.service';
import { Injectable } from '@nestjs/common';
import { TUserResponse } from '@/authentication/interfaces/auth.interface';
import { BaseAuthenticationService } from '@/authentication/base-authentication.service';

@Injectable()
export class LoginService extends BaseAuthenticationService {
  constructor(private readonly userService: UserService) {
    super();
  }

  private async credentials({ body }: Request) {
    const user = await this.userService.findOne('credentials@gmail.com');
    const originalPassword: string = get(body, 'password', '');
    const hashedPassword = get(user, 'password');
    const isMatch = this.comparePassword(originalPassword, hashedPassword);
    console.log('isMatch', isMatch);
    return this.transformUserResponseSendToClient(user);
  }

  private async google({ body }: Request) {
    console.log('google', body);
    const user = await this.userService.findOne('google@gmail.com');
    return this.transformUserResponseSendToClient(user);
  }

  private async phone_number({ body }: Request) {
    console.log('phone_number', body);
    const user = await this.userService.findOne('phone_number@gmail.com');

    return this.transformUserResponseSendToClient(user);
  }
  getHandler(grant_type: string): (req: Request) => Promise<TUserResponse> {
    this.validateGrantType(grant_type);
    return this[grant_type].bind(this);
  }
}
