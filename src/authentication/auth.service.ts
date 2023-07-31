import { Injectable } from '@nestjs/common';
import LoginStrategies from './strategies/login.strategy';
import { TLoginResponse } from '@/authentication/interfaces/auth.interface';

@Injectable()
export class AuthService {
  async login(grant_type: string): Promise<TLoginResponse> {
    const loginStrategy = LoginStrategies[grant_type];
    const user = await loginStrategy();

    return {
      user,
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      expires_in: 0,
    };
  }
}
