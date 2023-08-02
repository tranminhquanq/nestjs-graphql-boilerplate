import { HttpStatus, Injectable } from '@nestjs/common';
import { get, omit } from 'lodash';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from '@/authentication/strategies/login/login.service';
import { RegisterService } from '@/authentication/strategies/register/register.service';
import {
  IAuthenticateResponse,
  TRefreshTokenResponse,
} from '@/authentication/interfaces/auth.interface';
import { CustomException } from '@/common/exceptions/http-exception.filter';
import { tokenLifeTime } from '@/common/constants';

export enum EService {
  Login = 'loginService',
  Register = 'registerService',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  async authenticate(
    req: Request,
    service: EService,
  ): Promise<IAuthenticateResponse> {
    const grant_type = get(req.query, 'grant_type', '').toString();
    const strategiesService =
      service === EService.Login ? this.loginService : this.registerService;
    const handler = strategiesService.getHandler(grant_type);
    const user = await handler(req);

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(user),
      this.jwtService.signAsync(user, {
        expiresIn: tokenLifeTime.refresh,
      }),
    ]);
    const expires_in = this.jwtService.decode(access_token)['exp'];

    return {
      user,
      access_token,
      refresh_token,
      expires_in,
    };
  }

  async refreshToken(refresh_token: string): Promise<TRefreshTokenResponse> {
    try {
      const tokenDecoded = this.jwtService.verify(refresh_token);
      const payload = omit(tokenDecoded, ['iat', 'exp']);
      const access_token = this.jwtService.sign(payload);
      const expires_in = get(this.jwtService.decode(access_token), 'exp');
      return {
        access_token,
        expires_in,
      };
    } catch (error) {
      throw new CustomException(
        'Invalid token',
        'invalid_token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
