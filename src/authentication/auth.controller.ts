import { Controller, Get, HttpStatus, Query, Req } from '@nestjs/common';
import loginStrategies from './strategies/login.strategy';
import { TLoginResponse } from './interfaces/auth.interface';
import { CustomException } from '@/common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login')
  async login(
    @Req() request: Request,
    @Query('grant_type') grant_type: string,
  ): Promise<TLoginResponse> {
    if (!grant_type)
      throw new CustomException(
        'grant type is required',
        'grant_type_required',
        HttpStatus.BAD_REQUEST,
      );
    if (!(grant_type in loginStrategies))
      throw new CustomException(
        'does not support this grant_type',
        'grant_type_not_supported',
        HttpStatus.BAD_REQUEST,
      );

    return this.authService.login(grant_type);
  }
}
