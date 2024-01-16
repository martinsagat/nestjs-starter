import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenType } from './../auth.service';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const refreshToken = req.cookies['refreshToken'] || null;
    if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');

    const payload = this.jwtService.verify(refreshToken.token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
    });

    if (payload.tokenType !== TokenType.REFRESH)
      throw new UnauthorizedException('Invalid refresh token');

    if (!payload) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.usersService.findOne(payload.sub);
    if (!user) throw new UnauthorizedException('Invalid refresh token');
    if (!user.refreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken.token,
      user.refreshToken,
    );
    if (!isRefreshTokenValid)
      throw new UnauthorizedException('Invalid refresh token');

    req.user = user;

    next();
  }
}
