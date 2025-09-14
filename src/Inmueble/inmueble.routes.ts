import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './inmueble.controller.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  updateInmuebleSchema,
  addInmuebleSchema,
  deleteInmuebleSchema,
  findOneInmuebleSchema,
} from '../Schemas/inmueble.schema.js';
export const inmuebleRouter = Router();

inmuebleRouter.get('/', findAll);
inmuebleRouter.get('/:id', schemaValidation(findOneInmuebleSchema), findOne);
inmuebleRouter.post('/', schemaValidation(addInmuebleSchema), add);
inmuebleRouter.put('/:id', schemaValidation(updateInmuebleSchema), update);
inmuebleRouter.delete('/:id', schemaValidation(deleteInmuebleSchema), remove);
