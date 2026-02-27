// API service for frontend
// Uses VITE_API_URL environment variable (defaults to localhost:3000/api)

import type { Client } from '../components/Forms';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private apiUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.apiUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.apiUrl}${path}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(username: string, password: string) {
    return this.request<{ token: string }>('POST', '/login', { username, password });
  }

  // Client endpoints
  async getClients() {
    return this.request<Client[]>('GET', '/clients');
  }

  async getClient(id: string) {
    return this.request<Client>('GET', `/clients/${id}`);
  }

  async createClient(data: {
    name: string;
    email: string;
    phone?: string;
  }) {
    return this.request<Client>('POST', '/clients', data);
  }

  async updateClient(
    id: string,
    data: { name?: string; email?: string; phone?: string }
  ) {
    return this.request<Client>('PUT', `/clients/${id}`, data);
  }

  async deleteClient(id: string) {
    return this.request<void>('DELETE', `/clients/${id}`);
  }
}

export const apiClient = new ApiClient();
