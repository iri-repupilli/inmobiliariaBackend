import { Router } from 'express';
import {
  sanitizeInmuebleInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './inmueble.controler.js';

export const inmuebleRouter = Router();

inmuebleRouter.get('/', findAll);
inmuebleRouter.get('/:id', findOne);
inmuebleRouter.post('/', sanitizeInmuebleInput, add);
inmuebleRouter.put('/:id', sanitizeInmuebleInput, update);
inmuebleRouter.patch('/:id', sanitizeInmuebleInput, update);
inmuebleRouter.delete('/:id', remove);
