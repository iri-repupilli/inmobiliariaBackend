import { beforeAll, afterAll } from 'vitest';
import { getOrm, syncSchema } from './shared/db/orm.js';

beforeAll(async () => {
  await syncSchema();
});

afterAll(async () => {
  const orm = await getOrm();
  await orm.close();
});
