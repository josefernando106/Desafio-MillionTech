import type { Request, Response } from 'express';
import { ClientService } from '../service/client.service.js';

const service = new ClientService();

export class ClientController {
  async create(req: Request, res: Response) {
    const { name, email, phone } = req.body ?? {};
    if (!name || !email) return res.status(400).json({ error: 'name/email required' });

    const created = await service.create({ name, email, phone });
    return res.status(201).json(created);
  }

  async list(_req: Request, res: Response) {
    const items = await service.list();
    return res.json(items);
  }

  async get(req: Request, res: Response) {
    const item = await service.getById(req.params.id as string);
    if (!item) return res.status(404).json({ error: 'not found' });
    return res.json(item);
  }

  async update(req: Request, res: Response) {
    const updated = await service.update(req.params.id as string, req.body ?? {});
    if (!updated) return res.status(404).json({ error: 'not found' });
    return res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const deleted = await service.delete(req.params.id as string);
    if (!deleted) return res.status(404).json({ error: 'not found' });
    return res.status(204).send();
  }
}