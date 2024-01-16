import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  all() {
    return this.usersService.all();
  }
}
