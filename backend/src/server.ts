import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { AppDataSource } from './database/data-source';
import routes from './routes/index';

async function bootstrap() {
  await AppDataSource.initialize();

  const app = express();
  
  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? 'http://localhost' 
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }));
  app.use(express.json());

  app.use('/api', routes);

  app.listen(env.port, () => {
    console.log(`API on :${env.port}`);
  });
}

bootstrap().catch((e) => {
  console.error('BOOTSTRAP_ERROR', e);
  process.exit(1);
});
