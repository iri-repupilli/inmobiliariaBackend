import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './imagen.controller.js';
import {
  findOneImagen,
  addImagen,
  updateImagen,
  deleteImagen,
} from '../Schemas/imagen.schema.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';

export const imagenRouter = Router();

imagenRouter.get('/', findAll);
imagenRouter.get('/:id', schemaValidation(findOneImagen), findOne);
imagenRouter.post('/', schemaValidation(addImagen), add);
imagenRouter.put('/:id', schemaValidation(updateImagen), update);
imagenRouter.delete('/:id', schemaValidation(deleteImagen), remove);
