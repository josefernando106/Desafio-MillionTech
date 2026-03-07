import type { Client } from '../components/Forms';

const STORAGE_KEY = 'mock_clients';

const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.com', phone: '(11) 99999-1111' },
  { id: '2', name: 'João Santos', email: 'joao@email.com', phone: '(21) 98888-2222' },
  { id: '3', name: 'Ana Oliveira', email: 'ana@email.com', phone: '(31) 97777-3333' },
  { id: '4', name: 'Carlos Souza', email: 'carlos@email.com', phone: '(41) 96666-4444' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda@email.com', phone: '(51) 95555-5555' },
];

function getClients(): Client[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLIENTS));
    return INITIAL_CLIENTS;
  }
  return JSON.parse(raw);
}

function saveClients(clients: Client[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

async function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export class MockApiClient {
  async login(_username: string, _password: string) {
    await delay(500);
    return { token: 'mock-jwt-token-' + Date.now() };
  }

  async getClients() {
    await delay();
    return getClients();
  }

  async getClient(id: string) {
    await delay();
    const client = getClients().find((c) => c.id === id);
    if (!client) throw new Error('Cliente não encontrado');
    return client;
  }

  async createClient(data: { name: string; email: string; phone?: string }) {
    await delay();
    const clients = getClients();
    const newClient: Client = { id: generateId(), ...data };
    clients.push(newClient);
    saveClients(clients);
    return newClient;
  }

  async updateClient(id: string, data: { name?: string; email?: string; phone?: string }) {
    await delay();
    const clients = getClients();
    const idx = clients.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Cliente não encontrado');
    clients[idx] = { ...clients[idx], ...data };
    saveClients(clients);
    return clients[idx];
  }

  async deleteClient(id: string) {
    await delay();
    const clients = getClients().filter((c) => c.id !== id);
    saveClients(clients);
  }
}
