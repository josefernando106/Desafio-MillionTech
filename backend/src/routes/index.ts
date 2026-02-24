import { Router } from 'express';
import authRoutes from './auth.routes';
import clientRoutes from './client.routes';

const r = Router();

r.use(authRoutes);
r.use(clientRoutes);

export default r;
``