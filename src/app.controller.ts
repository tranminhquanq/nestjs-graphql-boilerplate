import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller('api/v1/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck() {
    return this.appService.healthCheck();
  }
}
