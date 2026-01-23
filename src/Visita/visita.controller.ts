import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { Visita } from './visita.entity.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : null;
    const userType = req.query.userType;
    const filtro =
      userType === 'admin' || userId === null ? {} : { usuario: userId };

    const visitas = await em.find(Visita, filtro, {
      populate: ['inmueble', 'usuario'],
    });
    res
      .status(200)
      .json({ message: 'encontradas todas las visitas', data: visitas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const visita = await em.findOneOrFail(
      Visita,
      { id },
      { populate: ['inmueble', 'usuario'] },
    );
    res.status(200).json({ message: 'la visita encontrada', data: visita });
  } catch (error: any) {
    res.status(404).json({ message: 'visita not found' });
  }
}

async function add(req: Request, res: Response) {
  try {
    const { usuario, inmueble, ...rest } = req.body;
    const user = em.getReference('Usuario', usuario);
    const inm = em.getReference('Inmueble', inmueble);
    const visita = em.create(Visita, { ...rest, usuario: user, inmueble: inm });
    await em.persistAndFlush(visita);
    res.status(201).json({ message: 'visita creada', data: visita });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const visita = await em.findOneOrFail(Visita, id);
    em.assign(visita, req.body);
    await em.flush();
    res.status(200).json({ message: 'visita actualizada' });
  } catch (error: any) {
    res.status(404).json({ message: 'visita not found' });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const visita = em.getReference(Visita, id);
    await em.removeAndFlush(visita);
    res.status(200).send({ message: 'visita eliminada' });
  } catch (error: any) {
    res.status(404).json({ message: 'visita not found' });
  }
}

export { findAll, findOne, add, update, remove };
