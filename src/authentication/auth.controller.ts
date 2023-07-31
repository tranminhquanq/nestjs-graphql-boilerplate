import { Controller, Get, Query, Req } from '@nestjs/common';
import { TLoginResponse } from './interfaces/auth.interface';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login')
  async login(
    @Req() request: Request,
    @Query('grant_type') grant_type: string,
  ): Promise<TLoginResponse> {
    return await this.authService.login(request, grant_type);
  }
}
