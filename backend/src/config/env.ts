import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT ?? 3000),

  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? 'postgres',
    pass: process.env.DB_PASS ?? 'postgres',
    name: process.env.DB_NAME ?? 'appdb',
  },

  jwtSecret: process.env.JWT_SECRET ?? 'change-me',
};