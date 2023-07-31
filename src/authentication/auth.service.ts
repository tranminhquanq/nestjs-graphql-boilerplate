import { Injectable } from '@nestjs/common';
import { TLoginResponse } from '@/authentication/interfaces/auth.interface';
import { AuthStrategiesService } from './strategies/auth-strategies.service';

@Injectable()
export class AuthService {
  constructor(private readonly authStrategiesService: AuthStrategiesService) {}

  async login(req: Request, grant_type: string): Promise<TLoginResponse> {
    const loginStrategy = this.authStrategiesService.loginService(grant_type);
    const user = await loginStrategy(req);

    return {
      user,
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      expires_in: 0,
    };
  }
}
