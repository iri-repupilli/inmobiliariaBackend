import { Localidad } from './localidad.entity.js';
import { getOrm } from '../shared/db/orm.js';
import { Request, Response } from 'express';

async function findAll(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const localidades = await em.find(Localidad, {});
    res.status(200).json({ message: 'Found localidades', data: localidades });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const localidad = await em.findOneOrFail(Localidad, id);
    res.status(200).json({ message: 'Found localidad', data: localidad });
  } catch (error: any) {
    res.status(404).json({ message: 'Localidad not found' });
  }
}

async function add(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const codPostal = req.body.codPostal;
    const existeLocalidad = await em.findOne(Localidad, { codPostal });
    if (
      existeLocalidad &&
      existeLocalidad.id !== Number.parseInt(req.params.id)
    ) {
      return res
        .status(400)
        .json({ message: 'El codigo postal ya esta registrado' });
    }
    const localidad = em.create(Localidad, req.body);
    await em.persistAndFlush(localidad);
    res
      .status(201)
      .json({ message: 'Localidad added successfully', data: localidad });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const codPostal = req.body.codPostal;
    const existeLocalidad = await em.findOne(Localidad, { codPostal });
    if (
      existeLocalidad &&
      existeLocalidad.id !== Number.parseInt(req.params.id)
    ) {
      return res
        .status(400)
        .json({ message: 'El codigo postal ya esta registrado' });
    }
    const id = Number.parseInt(req.params.id);
    const localidad = await em.findOneOrFail(Localidad, id);
    em.assign(localidad, req.body);
    await em.flush();
    res.status(200).json({ message: 'Localidad updated', data: localidad });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const localidad = em.getReference(Localidad, id);
    await em.removeAndFlush(localidad);
    res.status(200).json({ message: 'Localidad removed successfully' });
  } catch (error: any) {
    res.status(404).json({ message: 'Localidad not found' });
  }
}

export { findAll, findOne, add, update, remove };
