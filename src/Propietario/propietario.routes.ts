import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './propietario.controller.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddPropietarioSchema,
  FindOnePropietarioSchema,
  RemovePropietarioSchema,
  UpdatePropietarioSchema,
} from '../Schemas/propietario.schema.js';
export const propietarioRouter = Router();

propietarioRouter.get('/', findAll);
propietarioRouter.get('/:id', schemaValidation(FindOnePropietarioSchema), findOne);
propietarioRouter.post('/', schemaValidation(AddPropietarioSchema), add);
propietarioRouter.put('/:id', schemaValidation(UpdatePropietarioSchema), update);
propietarioRouter.patch('/:id', schemaValidation(UpdatePropietarioSchema), update);
propietarioRouter.delete('/:id', schemaValidation(RemovePropietarioSchema), remove);
