import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(@Res() res: Response): Record<string, any> {
    return res.status(200).send({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
    });
  }
}
