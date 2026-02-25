import { AppDataSource } from '../database/data-source.js';
import { Client } from '../entities/Clients.js';

export const clientRepo = () => AppDataSource.getRepository(Client);