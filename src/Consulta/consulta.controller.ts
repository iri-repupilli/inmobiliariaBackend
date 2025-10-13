import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { Consulta } from './consulta.entity.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const { condicion } = req.query;
    const where: any = {};

  if (condicion === 'true') {
    where.respuesta = '';
  }
    const consultas = await em.find(Consulta,where, {});
    res
      .status(200)
      .json({ message: 'encontradas todas las consultass', data: consultas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const consulta = await em.findOneOrFail(Consulta, { id });
    res.status(200).json({ message: 'la consulta encontrada', data: consulta });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const consulta = em.create(Consulta, req.body);
    await em.persistAndFlush(consulta);
    res.status(201).json({ message: 'consulta creada', data: consulta });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const consulta = await em.findOneOrFail(Consulta, id);
    em.assign(consulta, req.body);
    await em.flush();
    res.status(200).json({ message: 'consulta actualizada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const consulta = em.getReference(Consulta, id);
    await em.removeAndFlush(consulta);
    res.status(200).send({ message: 'consulta eliminada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
