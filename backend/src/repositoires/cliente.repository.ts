import { AppDataSource } from '../database/data-source';
import { Client } from '../entities/Client';

export const clientRepo = () => AppDataSource.getRepository(Client);