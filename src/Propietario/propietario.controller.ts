import { Propietario } from './propietario.entity.js';
import { orm } from '../shared/db/orm.js';
import { Request, Response, NextFunction } from 'express';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const propietarios = await em.find(Propietario, {});
    res.status(200).json({ message: 'Found all propietarios', data: propietarios });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const propietario = await em.findOneOrFail(Propietario, { id });
    res.status(200).json({ message: 'Found propietario', data: propietario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const mailPropietario = req.body.mailPropietario;
    const existePropietario = await em.findOne(Propietario, { mailPropietario });
    if (existePropietario) {
      return res.status(400).json({ message: 'El mail ya esta registrado' });
    }
    const propietario = em.create(Propietario, req.body);
    await em.persistAndFlush(propietario);
    res.status(201).json({ message: 'Propietary created', data: propietario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const mailPropietario = req.body.mailPropietario;
    const existePropietario = await em.findOne(Propietario, { mailPropietario });
    if (existePropietario && existePropietario.id !== Number.parseInt(req.params.id)) {
      return res.status(400).json({ message: 'El mail ya esta registrado' });
    }
    const id = Number.parseInt(req.params.id);
    const propietario = await em.findOneOrFail(Propietario, id);
    em.assign(propietario, req.body);
    await em.flush();
    res.status(200).json({ message: 'Propietary updated', data: propietario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const propietario = em.getReference(Propietario, id);
    await em.removeAndFlush(propietario);
    res.status(200).json({ message: 'Propietary deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
