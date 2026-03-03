import { Router } from 'express';
import authRoutes from './auth.routes.js';
import clientRoutes from './client.routes.js';

const r = Router();

r.get('/health', (_req, res) => res.json({ status: 'ok' }));
r.use(authRoutes);
r.use(clientRoutes);

export default r;
``