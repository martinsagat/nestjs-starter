import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
import { User } from './../shared/entities/user.entity';
import { Role } from './../shared/entities/role.entity';
import { UsersFactory } from './factories/user.factory';
import UserSeeder from './seeds/01-user.seeder';

dotenv.config({ path: '.env.development' });

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  seeds: [UserSeeder],
  factories: [UsersFactory],
  entities: [User, Role],
  synchronize: Boolean(process.env.DB_SYNC),
  logging: Boolean(process.env.DB_LOGGING),
};

export const dataSource = new DataSource(options);
