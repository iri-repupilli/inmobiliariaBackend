import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './visita.controller.js';
import {
  addVisitaSchema,
  updateVisitaSchema,
  deleteVisitaSchema,
  findOneVisitaSchema,
} from '../Schemas/visita.schema.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';

export const visitaRouter = Router();

visitaRouter.get('/', findAll);
visitaRouter.get('/:id', schemaValidation(findOneVisitaSchema), findOne);
visitaRouter.post('/', schemaValidation(addVisitaSchema), add);
visitaRouter.put('/:id', schemaValidation(updateVisitaSchema), update);
visitaRouter.delete('/:id', schemaValidation(deleteVisitaSchema), remove);
