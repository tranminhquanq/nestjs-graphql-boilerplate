import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { Request } from 'express';
import { LoginService } from './strategies/login/login.service';
import { RegisterService } from './strategies/register/register.service';

export enum EService {
  Login = 'loginService',
  Register = 'registerService',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  async authenticate(req: Request, service: EService) {
    const grant_type = get(req.query, 'grant_type', '').toString();
    const strategiesService =
      service === EService.Login ? this.loginService : this.registerService;
    const handler = strategiesService.getHandler(grant_type);
    const user = await handler(req);

    return {
      user,
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      expires_in: 0,
    };
  }

  async refreshToken(refresh_token: string) {
    return {
      access_token: 'access_token',
      expires_in: 0,
    };
  }
}
