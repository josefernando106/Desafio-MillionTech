import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const route = Router();
const controller = new AuthController();

route.post('/login', (req, res) => controller.login(req, res));

export default route;