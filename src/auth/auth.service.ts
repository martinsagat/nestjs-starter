import { Injectable, UnauthorizedException, Response } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { Response as EResponse } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { ConfigService } from '@nestjs/config';

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto, @Response() res: EResponse) {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid username or password');

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Invalid username or password');

    const accessToken = await this.generateToken(user, TokenType.ACCESS);
    const refreshToken = await this.generateToken(user, TokenType.REFRESH);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/auth/refresh',
      sameSite: 'lax',
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);
    return res.status(200).send({ access_token: accessToken });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const passwordValid = await user.validatePassword(password);

    if (user && passwordValid) {
      const result = { ...user };
      delete result.password;

      return result;
    }
    return null;
  }

  async refreshAccessToken(user: User): Promise<string> {
    return await this.generateToken(user, TokenType.ACCESS);
  }

  private async generateToken(
    user: User,
    tokenType: TokenType,
  ): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      tokenType,
    };

    switch (tokenType) {
      case TokenType.ACCESS:
        return await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
          secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
        });
      case TokenType.REFRESH:
        return await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
        });
      default:
        throw new Error('Invalid token type');
    }
  }
}
