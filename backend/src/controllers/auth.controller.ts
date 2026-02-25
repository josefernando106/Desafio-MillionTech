import type { Request, Response } from 'express';
import { AuthService } from '../service/auth.service.js';

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body ?? {};
    if (!username || !password) return res.status(400).json({ error: 'username/password required' });

    const result = await service.login(username, password);
    if (!result) return res.status(401).json({ error: 'invalid credentials' });

    return res.json(result);
  }
}
``