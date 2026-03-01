import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env.js'
import { Client } from '../entities/Clients.js';
import { User } from '../entities/User.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pass,
  database: env.db.name,
  entities: [Client, User],
  synchronize: true,     // para projeto simples. Em produção: migrations
  logging: false,
});