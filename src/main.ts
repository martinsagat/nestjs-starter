import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import baseConfig from './../config/base';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(baseConfig().port);
}
bootstrap();
