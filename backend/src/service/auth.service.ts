import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { userRepo } from '../repositoires/user.repository.js';

export class AuthService {
  async login(username: string, password: string) {
    const user = await userRepo().findOne({ where: { username } });
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      env.jwtSecret,
      { expiresIn: '1h' }
    );

    return { token };
  }
}