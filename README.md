# 🚀 Desafio MillionTech - Docker Setup

## 📋 Pré-requisitos

- Docker Desktop instalado ([Download](https://www.docker.com/products/docker-desktop))
- Git instalado

## 🐳 Quick Start (Production)

```bash
# Clonar o repositório
git clone <repo-url>
cd Desafio\ MillionTech


# Build e iniciar todos os serviços
docker-compose up --build

# Em outro terminal, para inicializar o banco com um usuário admin
docker-compose exec backend npm run seed
```

**Acessar a aplicação:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api
- Credenciais: admin / admin

---

## 🛠️ Development Setup

Para desenvolvimento local com hot-reload:

```bash
# 1. Iniciar apenas o PostgreSQL em container
docker-compose -f docker-compose.dev.yml up -d

# 2. Em um terminal, rodar o backend em desenvolvimento
cd backend
npm install
npm run dev

# 3. Em outro terminal, rodar o frontend em desenvolvimento
cd frontend
npm install
npm run dev
```

**Acessar:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## 📦 Arquitetura do Docker

```
docker-compose.yml
├── PostgreSQL (postgres:16-alpine)
│   └── Volume: postgres_data
├── Backend (Node.js 20 + TypeScript)
│   ├── Build multi-stage
│   ├── Port: 3000
│   └── Depends on: PostgreSQL
└── Frontend (React + Vite)
    ├── Build multi-stage
    ├── Port: 5173 → 3000
    └── Depends on: Backend
```

---

## 🔧 Comandos Úteis

```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f postgres

# Parar os serviços
docker-compose down

# Parar e remover volumes (⚠️ deleta os dados)
docker-compose down -v

# Reconstruir uma imagem específica
docker-compose build --no-cache backend

# Executar comando no container
docker-compose exec backend npm run seed
docker-compose exec postgres psql -U postgres -d appdb

# Ver status dos containers
docker-compose ps

# Acessar shell do container
docker-compose exec backend sh
docker-compose exec postgres bash
```

---

## 🌍 Variáveis de Ambiente

Criar `.env` na raiz do projeto (copiar de `.env.example`):

```env
PORT=3000
DB_HOST=postgres  # usar 'postgres' em Docker, 'localhost' em local
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=appdb
JWT_SECRET=supersecret
VITE_API_URL=http://localhost:3000/api  # Frontend
```

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to PostgreSQL"

```bash
# Verificar se o PostgreSQL está saudável
docker-compose ps

# Ver logs do postgres
docker-compose logs postgres

# Reiniciar tudo
docker-compose down -v
docker-compose up --build
```

### Erro: "Port 5432 already in use"

```bash
# Matar processos na porta 5432 (Windows)
Get-Process | where {$_.ProcessName -like "*postgres*"} | Stop-Process

# Linux/Mac
lsof -ti:5432 | xargs kill -9
```

### Build falha no backend/frontend

```bash
# Limpar cache de build
docker-compose build --no-cache

# Verificar tamanho de imagens
docker images

# Remover imagens não utilizadas
docker image prune
```

---

## 📊 Monitoramento

```bash
# Ver uso de recursos
docker stats

# Ver detalhes de um container
docker inspect desafio-backend

# Ver histórico de logs
docker logs --tail 100 desafio-backend
```

---

## 🚢 Deploy em Produção

1. **Usar variáveis de ambiente seguras:**

   ```bash
   export JWT_SECRET=seu-secret-seguro
   export DB_PASS=sua-senha-segura
   ```

2. **Configurar reverse proxy (Nginx):**

   ```nginx
   location / {
       proxy_pass http://localhost:5173;
   }
   location /api {
       proxy_pass http://localhost:3000;
   }
   ```

3. **Usar volumes persistentes para banco de dados**
4. **Configurar health checks e auto-restart**

---

## 📚 Referências

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Alpine Linux Benefits](https://alpinelinux.org/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
