import { Request, Response } from 'express';
import { getOrm } from '../shared/db/orm.js';
import {
  Casa,
  Departamento,
  Cochera,
  Terreno,
  Inmueble,
} from './inmueble.entity.js';
import { TipoServicio } from '../TipoServicio/tipoServicio.entity.js';

const tipoClasesMap = {
  casa: Casa,
  departamento: Departamento,
  cochera: Cochera,
  terreno: Terreno,
};

async function findAll(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const tipo = (req.query.tipo || '').toString().trim().toLowerCase();
    const calle = (req.query.calle || '').toString().trim();
    const localidad = (req.query.localidad || '').toString().trim();
    const precioDolar = (req.query.precioDolar || '').toString().trim();
    const tipoServicio = (req.query.tipoServicio || '').toString().trim();
    const where: any = {};
    if (tipo) where.tipo = tipo;
    if (calle) where.direccionCalle = { $like: `%${calle}%` };
    if (localidad) where.localidad = localidad;
    if (precioDolar) {
      if (precioDolar === '0-50000') {
        where.precioDolar = { $lte: 50000 };
      } else if (precioDolar === '50000-100000') {
        where.precioDolar = { $gte: 50000, $lte: 100000 };
      } else if (precioDolar === '100000-200000') {
        where.precioDolar = { $gte: 100000, $lte: 200000 };
      } else if (precioDolar === '200000+') {
        where.precioDolar = { $gte: 200000 };
      }
    }
    if (tipoServicio) {
      const tipoServicioObj = await em.findOne(TipoServicio, {
        nombreTipoServicio: tipoServicio,
      });
      if (tipoServicioObj) {
        where.tipoServicio = tipoServicioObj.id;
      } else {
        return res.status(200).json({
          message: 'No se encontraron inmuebles para ese tipo de servicio',
          data: [],
        });
      }
    }
    const inmuebles = await em.find(Inmueble, where, {
      populate: [
        'propietario',
        'tipoServicio',
        'localidad',
        'consultas',
        'visita',
      ],
    });
    const inmueblesPlain = inmuebles.map((i) => ({
      ...(i as any),
      tipo: i.constructor.name.toLowerCase(),
    }));
    res.status(200).json({
      message: 'se encontraron todos los inmuebles',
      data: inmueblesPlain,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const inmueble = await em.findOneOrFail(
      Inmueble,
      { id },
      {
        populate: [
          'propietario',
          'tipoServicio',
          'localidad',
          'consultas.usuario',
          'visita',
        ],
      },
    );
    const inmueblePlain = {
      ...(inmueble as any),
      tipo: inmueble.constructor.name.toLowerCase(),
    };
    res
      .status(200)
      .json({ message: 'se encontró el inmueble', data: inmueblePlain });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const tipo = req.body.tipo;
    const ClaseInmueble = tipoClasesMap[tipo as keyof typeof tipoClasesMap];
    const inmueble = em.create(ClaseInmueble, req.body);
    await em.persistAndFlush(inmueble);
    res
      .status(201)
      .json({ message: `${tipo} agregad@ correctamente`, data: inmueble });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const inmuebleToUpdate = await em.findOneOrFail(Inmueble, { id });
    em.assign(inmuebleToUpdate, req.body);
    await em.flush();
    res.status(200).json({ message: 'inmueble actualizado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const orm = await getOrm();
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const inmueble = em.getReference(Inmueble, id);
    await em.removeAndFlush(inmueble);
    res.status(200).json({ message: 'inmueble eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, update, add, remove };
