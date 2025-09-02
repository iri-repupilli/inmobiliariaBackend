import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './resena.controller.js';
import {
  findOneResena,
  addResena,
  updateResena,
  deleteResena,
} from '../Schemas/resena.schema.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
export const resenaRouter = Router();

resenaRouter.get('/', findAll);
resenaRouter.get('/:id', schemaValidation(findOneResena), findOne);
resenaRouter.post('/', schemaValidation(addResena), add);
resenaRouter.put('/:id', schemaValidation(updateResena), update);
resenaRouter.delete('/:id', schemaValidation(deleteResena), remove);
