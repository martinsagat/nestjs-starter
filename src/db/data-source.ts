import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dbConfig from './../../config/database/mysql.config';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  database: 'localdb',
  username: 'localuser',
  password: 'secret',
  host: 'localhost',
  port: 3306,
  seeds: ['src/db/seeds/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}'],
  entities: ['src/shared/entities/**/*{.ts,.js}'],
  synchronize: true,
};

export const dataSource = new DataSource(options);
