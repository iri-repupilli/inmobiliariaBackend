import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('GET /api/propietarios - integracion', () => {
  test('responde 200 y devuelve un array', async () => {
    const response = await request(app).get('/api/propietarios');
    console.log('response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });
  test('response 404 si el propietario no existe', async () => {
    const response = await request(app).get('/api/propietarios/99999');
    console.log('response body: ', response.body);
    expect(response.status).toBe(404);
  });
});
