import { Injectable } from '@nestjs/common';
import { LoginStrategiesService } from '@/authentication/strategies/login/login.service';
import { RegisterStrategiesService } from '@/authentication/strategies/register/register.service';

@Injectable()
export class AuthStrategiesService {
  constructor(
    private readonly loginStrategiesService: LoginStrategiesService,
    private readonly registerStrategiesService: RegisterStrategiesService,
  ) {}

  loginService(grant_type: string) {
    return this.loginStrategiesService.strategies(grant_type);
  }

  registerService(grant_type: string) {
    return this.registerStrategiesService.strategies(grant_type);
  }
}
