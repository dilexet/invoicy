import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  useUTC: true,
  synchronize: true,
  logging: false,
  entities: [],
};

export const dataSource = new DataSource(options);
