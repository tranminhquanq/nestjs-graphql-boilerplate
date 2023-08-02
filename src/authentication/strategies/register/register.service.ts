import { Request } from 'express';
import { UserService } from '@/models/user/user.service';
import { Injectable } from '@nestjs/common';
import { TUserResponse } from '@/authentication/interfaces/auth.interface';
import { BaseAuthenticationService } from '@/authentication/base-authentication.service';

@Injectable()
export class RegisterService extends BaseAuthenticationService {
  constructor(private readonly userService: UserService) {
    super();
  }

  private async credentials({ body }: Request) {
    const user = await this.userService.findOne('credentials@gmail.com');
    const hashedPassword = this.hashPassword(body.password || '');
    console.log('hashedPassword', hashedPassword);
    return this.transformUserResponseSendToClient(user);
  }

  private async google({ body }: Request): Promise<TUserResponse> {
    console.log('google', body);
    const user = await this.userService.findOne('google@gmail.com');
    return this.transformUserResponseSendToClient(user);
  }

  private async phone_number({ body }: Request): Promise<TUserResponse> {
    console.log('phone_number', body);
    const user = await this.userService.findOne('phone_number@gmail.com');
    console.log('user', user);
    return this.transformUserResponseSendToClient(user);
  }

  getHandler(grant_type: string): (request: Request) => Promise<TUserResponse> {
    this.validateGrantType(grant_type);
    return this[grant_type].bind(this);
  }
}
