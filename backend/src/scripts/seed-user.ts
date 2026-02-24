import { AppDataSource } from '../database/data-source';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';

async function run() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(User);
  const username = 'admin';
  const password = 'admin';

  const exists = await repo.findOne({ where: { username } });
  if (!exists) {
    const u = repo.create({
      username,
      passwordHash: await bcrypt.hash(password, 10),
    });
    await repo.save(u);
    console.log('seeded', { username, password });
  } else {
    console.log('user exists');
  }

  await AppDataSource.destroy();
}

run().catch(console.error);