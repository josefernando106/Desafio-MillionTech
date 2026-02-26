import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Node + TypeORM + Postgres',
      version: '1.0.0',
    },
    servers: [{ url: `http://localhost:${env.port}/api` }],
    components: {
      securitySchemes: {
        BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.ts', './src/entities/**/*.ts'],
});