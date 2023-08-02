import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { Public } from '@/common/guards/auth.guard';

@Controller('api/v1/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  healthCheck() {
    return this.appService.healthCheck();
  }
}
