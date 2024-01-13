import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const createDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions & SeederOptions => {
  return {
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_NAME'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    synchronize: configService.get<boolean>('DB_SYNC'),
    logging: configService.get<boolean>('DB_LOGGING'),
    seeds: ['src/db/seeds/**/*{.ts,.js}'],
    factories: ['src/db/factories/**/*{.ts,.js}'],
    entities: ['dist/**/*.entity.js'],
  };
};
