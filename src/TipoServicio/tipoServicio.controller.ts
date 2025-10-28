import { orm } from '../shared/db/orm.js';
import { Request, Response } from 'express';
import { TipoServicio } from './tipoServicio.entity.js';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const tipoServicios = await em.find(TipoServicio, {});
    res.status(200).json({
      message: 'found tipos de servicio',
      data: tipoServicios,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoServicio = await em.findOneOrFail(TipoServicio, { id });
    res
      .status(200)
      .json({ message: 'found tipo de servicio', data: tipoServicio });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const tipoServicio = em.create(TipoServicio, req.body);
    await em.persistAndFlush(tipoServicio);
    res.status(201).json({
      message: 'tipo de servicio agregado correctamente',
      data: tipoServicio,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoServicioToUpdate = await em.findOneOrFail(TipoServicio, id);
    em.assign(tipoServicioToUpdate, req.body);
    await em.flush();
    res.status(200).json({
      message: 'actualizado correctamente',
      data: tipoServicioToUpdate,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoServicio = em.getReference(TipoServicio, id);
    await em.removeAndFlush(tipoServicio);
    res
      .status(200)
      .json({ message: 'tipo de servicio eliminado correctamente' });
  } catch (error: any) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      // Error por clave foránea en MySQL
      return res.status(400).json({
        message:
          'No se puede eliminar: hay inmuebles que usan este tipo de servicio.',
      });
    } else {
      res.status(500).json({ message: error.message });
    }
    throw error;
  }
}
export { findAll, findOne, add, update, remove };
