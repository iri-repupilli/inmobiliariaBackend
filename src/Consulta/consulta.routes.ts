import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './consulta.controller.js';
import {
  findOneConsulta,
  addConsulta,
  updateConsulta,
  deleteConsulta,
} from '../Schemas/consulta.schema.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
export const consultaRouter = Router();

consultaRouter.get('/', findAll);
consultaRouter.get('/:id', schemaValidation(findOneConsulta), findOne);
consultaRouter.post('/', schemaValidation(addConsulta), add);
consultaRouter.put('/:id', schemaValidation(updateConsulta), update);
consultaRouter.delete('/:id', schemaValidation(deleteConsulta), remove);
