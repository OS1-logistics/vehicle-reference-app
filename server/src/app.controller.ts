import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  sendJsFile(@Res() res: Response): void {
    res.header('Content-Type', 'application/javascript');
    res.sendFile('path/to/main.47bc28dc.js');
  }
}
