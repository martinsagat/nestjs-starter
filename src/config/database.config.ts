import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from './../db/seeds/01-user.seeder';
import RoleSeeder from './../db/seeds/02-role.seeder';
import UserRoleSeeder from './../db/seeds/03-user-role.seeder';
import { Role } from './../shared/entities/role.entity';
import { User } from './../shared/entities/user.entity';

export const createDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions & SeederOptions => {
  return {
    type: configService.get<'mysql' | 'sqlite'>('DB_DRIVER'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_NAME'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    synchronize: configService.get<boolean>('DB_SYNC'),
    logging: configService.get<boolean>('DB_LOGGING'),
    seeds: [UserSeeder, RoleSeeder, UserRoleSeeder],
    factories: ['src/db/factories/**/*{.ts,.js}'],
    entities: [User, Role],
  };
};
