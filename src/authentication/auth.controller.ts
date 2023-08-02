import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { AuthService, EService } from './auth.service';
import { CustomException } from '@/common/exceptions/http-exception.filter';
import { Public } from '@/common/guards/auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req) {
    const authRes = await this.authService.authenticate(req, EService.Login);
    const { user, ...tokenObject } = authRes;
    return {
      data: user,
      ...tokenObject,
    };
  }

  @Public()
  @Post('register')
  async register(@Request() req) {
    const authRes = await this.authService.authenticate(req, EService.Register);
    const { user, ...tokenObject } = authRes;
    return {
      data: user,
      ...tokenObject,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh_token')
  async refreshToken(@Body('refresh_token') refresh_token: string) {
    if (!refresh_token) {
      throw new CustomException(
        'Refresh token is required',
        'refresh_token_required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const tokenObject = await this.authService.refreshToken(refresh_token);
    return {
      data: tokenObject,
    };
  }
}
