import { orm } from '../shared/db/orm';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { findAll } from './inmueble.controller';
import { Inmueble } from './inmueble.entity';

const findMock = vi.fn();
const findOneMock = vi.fn();

vi.mock('../shared/db/orm', () => ({
  orm: {
    em: {
      find: (...args: any) => findMock(...args),
      findOne: (...args: any) => findOneMock(...args),
    },
  },
}));

describe('findAll - filtros', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findMock.mockResolvedValue([]);
    findOneMock.mockResolvedValue(null);
  });

  test('trae todos los inmuebles', async () => {
    const req: any = { query: {} };

    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    await findAll(req, res);

    expect(findMock).toHaveBeenCalledWith(
      Inmueble,
      {},
      expect.objectContaining({ populate: expect.any(Array) }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Array),
      }),
    );
  });

  test('aplica filtro por localidad', async () => {
    const req: any = {
      query: { localidad: '2' },
    };

    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await findAll(req, res);
    expect(findMock).toHaveBeenCalledWith(
      Inmueble,
      expect.objectContaining({
        localidad: '2',
      }),
      expect.objectContaining({
        populate: expect.any(Array),
      }),
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Array),
      }),
    );
  });

  test('aplica filtro por tipo de servicio', async () => {
    findOneMock.mockResolvedValue({ id: 1 }); // hay tipos de servicio creados
    const req: any = {
      query: {
        tipoServicio: '1',
      },
    };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    await findAll(req, res);
    expect(findMock).toHaveBeenCalledWith(
      Inmueble,
      expect.objectContaining({
        tipoServicio: 1,
      }),
      expect.objectContaining({
        populate: expect.any(Array),
      }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Array),
      }),
    );
  });
  test('aplica filtro por precio', async () => {
    const req: any = { query: { precioDolar: '50000-100000' } };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await findAll(req, res);
    expect(findMock).toHaveBeenCalledWith(
      Inmueble,
      expect.objectContaining({
        precioDolar: {
          $gte: 50000,
          $lte: 100000,
        },
      }),
      expect.objectContaining({ populate: expect.any(Array) }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Array),
      }),
    );
  });

  test('retorna 500 si la base de datos falla', async () => {
    findMock.mockRejectedValue(new Error('DB error'));
    const req: any = { query: {} };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await findAll(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
