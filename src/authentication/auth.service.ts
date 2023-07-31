import { Injectable } from '@nestjs/common';
import { TLoginResponse } from '@/authentication/interfaces/auth.interface';
import { LoginStrategiesService } from './strategies/login/login.service';
import { RegisterStrategiesService } from './strategies/register/register.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginStrategiesService,
    private readonly registerService: RegisterStrategiesService,
  ) {}

  async login(req: Request, grant_type: string): Promise<TLoginResponse> {
    const loginStrategy = this.loginService.strategies(grant_type);
    const user = await loginStrategy(req);

    return {
      user,
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      expires_in: 0,
    };
  }

  async register(req: Request, grant_type: string) {
    const registerStrategy = this.registerService.strategies(grant_type);
    const user = await registerStrategy(req);

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
