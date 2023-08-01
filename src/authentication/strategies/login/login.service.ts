import { omit } from 'lodash';
import { Request } from 'express';
import { UserService } from '@/models/user/users.service';
import { Injectable } from '@nestjs/common';
import { TUserResponse } from '@/authentication/interfaces/auth.interface';
import { BaseAuthenticationService } from '@/authentication/base-authentication.service';

@Injectable()
export class LoginService extends BaseAuthenticationService {
  constructor(private readonly userService: UserService) {
    super();
  }

  private async credentials(req: Request): Promise<TUserResponse> {
    console.log('credentials', req.body);
    const user = await this.userService.findOne('credentials@gmail.com');
    return omit(user, ['password']);
  }

  private async google(req: Request): Promise<TUserResponse> {
    console.log('google', req.body);
    const user = await this.userService.findOne('google@gmail.com');
    return omit(user, ['password']);
  }

  private async phone_number(req: Request): Promise<TUserResponse> {
    console.log('phone_number', req.body);
    const user = await this.userService.findOne('phone_number@gmail.com');

    return omit(user, ['password']);
  }
  getHandler(grant_type: string): (req: Request) => Promise<TUserResponse> {
    this.validateGrantType(grant_type);
    return this[grant_type].bind(this);
  }
}
