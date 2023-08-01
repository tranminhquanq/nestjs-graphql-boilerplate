import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService, EService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() request: Request) {
    return await this.authService.authenticate(request, EService.Login);
  }

  @Post('register')
  async register(@Req() request: Request) {
    return await this.authService.authenticate(request, EService.Register);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh_token')
  refreshToken(@Body('refresh_token') refresh_token: string) {
    return this.authService.refreshToken(refresh_token);
  }
}
