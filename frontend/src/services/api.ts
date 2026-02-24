// API service for frontend
// Uses VITE_API_URL environment variable (defaults to localhost:3000/api)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

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
  async login(email: string, password: string) {
    return this.request('/auth/login', 'POST', { email, password });
  }

  // Client endpoints
  async getClients() {
    return this.request('/clients', 'GET');
  }

  async getClient(id: string) {
    return this.request(`/clients/${id}`, 'GET');
  }

  async createClient(data: {
    name: string;
    email: string;
    phone?: string;
  }) {
    return this.request('/clients', 'POST', data);
  }

  async updateClient(
    id: string,
    data: { name?: string; email?: string; phone?: string }
  ) {
    return this.request(`/clients/${id}`, 'PUT', data);
  }

  async deleteClient(id: string) {
    return this.request(`/clients/${id}`, 'DELETE');
  }
}

export const apiClient = new ApiClient();
