import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import baseConfig from './../config/base';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './../config/database/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig],
    }),
    TypeOrmModule.forRoot(config),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
