import { Imagen } from './imagen.entity.js';
import { orm } from '../shared/db/orm.js';
import { Request, Response } from 'express';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const imagenes = await em.find(Imagen, {});
    res.status(200).json({ message: 'Found all imagenes', data: imagenes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const imagen = await em.findOneOrFail(Imagen, { id });
    res.status(200).json({ message: 'Found imagen', data: imagen });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const imagen = em.create(Imagen, req.body);
    await em.persistAndFlush(imagen);
    res.status(201).json({ message: 'Imagen created', data: imagen });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const imagen = await em.findOneOrFail(Imagen, id);
    await em.removeAndFlush(imagen);
    res.status(200).json({ message: 'Imagen deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const imagen = await em.findOneOrFail(Imagen, id);
    em.assign(imagen, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Imagen updated successfully', data: imagen });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, remove, update };
