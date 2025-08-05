import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { Inmueble } from './inmueble.entity.js';

function sanitizeInmuebleInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    mtrs: req.body.mtrs,
    descripcion: req.body.descripcion,
    antiguedad: req.body.antiguedad,
    fechaPublicacion: req.body.fechaPublicacion,
    requisitos: req.body.requisitos,
    propietario: req.body.propietario,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

const em = orm.em;
async function findAll(req: Request, res: Response) {
  try {
    const inmuebles = await em.find(Inmueble, {}, { populate: ['propietario'] });
    res.status(200).json({
      message: 'se encontraron todos los inmuebles',
      data: inmuebles,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const inmueble = await em.findOneOrFail(Inmueble, { id }, { populate: ['propietario'] });
    res
      .status(200)
      .json({ message: 'se encontró el inmueble', data: inmueble });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function add(req: Request, res: Response) {
  try {
    const inmueble = em.create(Inmueble, req.body.sanitizedInput);

    await em.persistAndFlush(inmueble);
    res
      .status(201)
      .json({ message: 'inmueble agregado correctamente', data: inmueble });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const inmuebleToUpdate = await em.findOneOrFail(Inmueble, { id });
    // const inmueble = em.getReference(Inmueble, id);
    em.assign(inmuebleToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'inmueble actualizado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const inmueble = em.getReference(Inmueble, id);
    await em.removeAndFlush(inmueble);
    res.status(200).json({
      message: 'inmueble eliminado correctamente',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export { sanitizeInmuebleInput, findAll, findOne, update, add, remove };
