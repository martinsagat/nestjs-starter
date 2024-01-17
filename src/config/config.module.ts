import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { validate } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`.env.${process.env.APP_ENV}`],
      validate,
    }),
  ],
  exports: [NestConfigModule, ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}
