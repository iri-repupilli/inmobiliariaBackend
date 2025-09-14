import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddUsuarioSchema,
  FindOneUsuarioSchema,
  RemoveUsuarioSchema,
  UpdateUsuarioSchema,
} from '../Schemas/usuario.schema.js';
import { findAll, findOne, add, update, remove } from './usuario.controller.js';
import { Router } from 'express';

const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', schemaValidation(FindOneUsuarioSchema), findOne);
usuarioRouter.post('/', schemaValidation(AddUsuarioSchema), add);
usuarioRouter.put('/:id', schemaValidation(UpdateUsuarioSchema), update);
usuarioRouter.delete('/:id', schemaValidation(RemoveUsuarioSchema), remove);

export { usuarioRouter };
