import { Router } from 'express';
import { ClientController } from '../controllers/client.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const route = Router();
const controllerClient = new ClientController();

route.use(authMiddleware);

route.post('/clients', (req, res) => controllerClient.create(req, res));
route.get('/clients', (req, res) => controllerClient.list(req, res));
route.get('/clients/:id', (req, res) => controllerClient.get(req, res));
route.put('/clients/:id', (req, res) => controllerClient.update(req, res));
route.delete('/clients/:id', (req, res) => controllerClient.delete(req, res));

export default route;