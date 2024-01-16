import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { Response as EResponse } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Role } from './../shared/enums/role.enum';
import { RoleService } from './../role/role.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private roleService: RoleService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() signInDto: SignInDto, @Response() res: EResponse) {
    return this.authService.signIn(signInDto, res);
  }

  @Post('register')
  async signUp(@Body() signUpData: SignupDto) {
    const role = await this.roleService.findByName(Role.User);
    await this.usersService.create(signUpData, [role]);
    return { message: 'User created successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: Record<string, any>) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async signOut(
    @Request() req: Record<string, any>,
    @Response() res: EResponse,
  ) {
    this.usersService.updateRefreshToken(req.user.id, null);
    return res.status(200).send('Logged out successfully');
  }

  @Post('refresh')
  async refresh(@Request() req: Record<string, any>) {
    return await this.authService.refreshAccessToken(req.user);
  }
}
