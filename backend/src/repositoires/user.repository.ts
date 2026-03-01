import { AppDataSource } from '../database/data-source.js';
import type { Client } from '../entities/Clients.js';
import { User } from '../entities/User.js';

export const userRepo = () => AppDataSource.getRepository(User);

function useClientsStorage() {
  return {
    load: () => {
      const data = localStorage.getItem('clients')
      return data ? JSON.parse(data) : []
    },
    save: (clients: Client[]) => {
      localStorage.setItem('clients', JSON.stringify(clients))
    }
  }
}