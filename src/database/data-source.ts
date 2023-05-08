import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'invoice_db',
  useUTC: true,
  synchronize: true,
  logging: false,
  entities: [],
};

export const dataSource = new DataSource(options);
