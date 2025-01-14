import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/api/1.0")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/getHello")
  getHello(): string {
    return this.appService.getHello();
  }
}
