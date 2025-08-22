import { orm } from '../shared/db/orm.js';
import { Request, Response } from 'express';
import { TipoServicio } from './tipoServicio.entity.js';

// const pasos = (req: Request, res: Response) => {
//   try {
//     const result = addTipoServicioSchema.parse(req.body);
//     console.log(result);
//     res.send('Entro');
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return res
//         .status(400)
//         .json(error.issues.map((issue) => ({ message: issue.message })));
//     }
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const addTipoServicioSchema = z.object({
//   nombreTipoServicio: z.string().nonempty('Se necesita el nombre').min(1),
//   descripcionTipoServicio: z
//     .string()
//     .nonempty('Se necesita la descripcion')
//     .min(1),
// });

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
    await em.flush();
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
    const tipoServicioToUpdate = em.getReference(TipoServicio, id);
    em.assign(tipoServicioToUpdate, req.body);
    await em.flush();
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
    res.status(500).json({ message: error.message });
  }
}
export { findAll, findOne, add, update, remove };
