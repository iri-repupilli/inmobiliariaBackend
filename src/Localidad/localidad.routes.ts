import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './localidad.controler.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddLocalidadSchema,
  FindOneLocalidadSchema,
  RemoveLocalidadSchema,
  UpdateLocalidadSchema,
} from '../Schemas/localidad.schema.js';

const localidadRouter = Router();

localidadRouter.get('/', findAll);
localidadRouter.get('/:id', schemaValidation(FindOneLocalidadSchema), findOne);
localidadRouter.post('/', schemaValidation(AddLocalidadSchema), add);
localidadRouter.put('/:id', schemaValidation(UpdateLocalidadSchema), update);
localidadRouter.delete('/:id', schemaValidation(RemoveLocalidadSchema), remove);

export { localidadRouter };
