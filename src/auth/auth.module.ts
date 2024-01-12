import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './../../config/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
    }),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConfig().jwt.secretKey,
      signOptions: { expiresIn: jwtConfig().jwt.expiresIn || '120s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
