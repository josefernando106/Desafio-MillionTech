import { clientRepo } from '../repositoires/cliente.repository.js';
import { Client } from '../entities/Clients.js';

export class ClientService {
  async create(data: Pick<Client, 'name' | 'email' | 'phone'>) {
    const repo = clientRepo();
    const client = repo.create(data);
    return repo.save(client);
  }

  async list() {
    return clientRepo().find({ order: { name: 'ASC' } });
  }

  async getById(id: string) {
    return clientRepo().findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Pick<Client, 'name' | 'email' | 'phone'>>) {
    const repo = clientRepo();
    const client = await repo.findOne({ where: { id } });
    if (!client) return null;

    Object.assign(client, data);
    return repo.save(client);
  }
}
``