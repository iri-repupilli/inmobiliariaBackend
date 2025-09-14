import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { Casa, Departamento, Cochera, Terreno, Inmueble } from './inmueble.entity.js';

// Mapa de tipos a clases
const tipoClasesMap = {
  casa: Casa,
  departamento: Departamento,
  cochera: Cochera,
  terreno: Terreno,
};

/*function sanitizeInmuebleInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tipo = req.body.tipo; // Debe venir en el body

  if (!tipo || !tipoClasesMap[tipo as keyof typeof tipoClasesMap]) {
    return res.status(400).json({
      message: 'Tipo de inmueble requerido o inválido',
      tiposValidos: Object.keys(tipoClasesMap),
    });
  }

  // Sanitizar campos comunes
  req.body.sanitizedInput = {
    mtrs: req.body.mtrs,
    descripcion: req.body.descripcion,
    antiguedad: req.body.antiguedad,
    fechaPublicacion: req.body.fechaPublicacion || new Date(),
    requisitos: req.body.requisitos,
    propietario: req.body.propietario,
    tipoServicio: req.body.tipoServicio,
    localidad: req.body.localidad,
  };

  // Agregar campos específicos según el tipo
  switch (tipo) {
    case 'casa':
      Object.assign(req.body.sanitizedInput, {
        cantAmbientes: req.body.cantAmbientes,
        cantBanios: req.body.cantBanios,
        patio: req.body.patio || false,
        pileta: req.body.pileta || false,
      });
      break;
    case 'departamento':
      Object.assign(req.body.sanitizedInput, {
        cantAmbientes: req.body.cantAmbientes,
        cantBanios: req.body.cantBanios,
        balcon: req.body.balcon || false,
      });
      break;
    case 'cochera':
      Object.assign(req.body.sanitizedInput, {
        techo: req.body.techo || false,
        tipoVehiculo: req.body.tipoVehiculo,
      });
      break;
    case 'terreno':
      Object.assign(req.body.sanitizedInput, {
        ancho: req.body.ancho,
        largo: req.body.largo,
        superficieTotal: req.body.superficieTotal,
        nroParcela: req.body.nroParcela,
        zonificacion: req.body.zonificacion,
      });
      break;
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
*/

const em = orm.em;
async function findAll(req: Request, res: Response) {
  try {
    const inmuebles = await em.find(Inmueble, {}, { populate: ['propietario', 'tipoServicio', 'localidad'] });
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
    const inmueble = await em.findOneOrFail(
      Inmueble,
      { id },
      { populate: ['propietario', 'tipoServicio', 'localidad'] }
    );
    res.status(200).json({ message: 'se encontró el inmueble', data: inmueble });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const tipo = req.body.tipo;
    const ClaseInmueble = tipoClasesMap[tipo as keyof typeof tipoClasesMap];

    const inmueble = em.create(ClaseInmueble, req.body);
    await em.persistAndFlush(inmueble);

    res.status(201).json({
      message: `${tipo} agregad@ correctamente`,
      data: inmueble,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipo = req.body.tipo;
    const ClaseInmueble = tipoClasesMap[tipo as keyof typeof tipoClasesMap];

    const inmuebleToUpdate = await em.findOneOrFail(ClaseInmueble, { id });
    // const inmueble = em.getReference(Inmueble, id);
    em.assign(inmuebleToUpdate, req.body);
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

export { findAll, findOne, update, add, remove };
