import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`${process.env.APP_ENV}.env`],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
