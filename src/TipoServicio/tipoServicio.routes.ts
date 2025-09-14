import { findAll, findOne, add, update, remove } from './tipoServicio.controller.js';
import { Router } from 'express';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddTipoServicioSchema,
  FindOneTipoServicioSchema,
  RemoveTipoServicioSchema,
  UpdateTipoServicioSchema,
} from '../Schemas/tipoServicio.schema.js';

const tipoServicioRouter = Router();

tipoServicioRouter.get('/', findAll);
tipoServicioRouter.get('/:id', schemaValidation(FindOneTipoServicioSchema), findOne);
tipoServicioRouter.post('/', schemaValidation(AddTipoServicioSchema), add);
tipoServicioRouter.put('/:id', schemaValidation(UpdateTipoServicioSchema), update);
tipoServicioRouter.delete('/:id', schemaValidation(RemoveTipoServicioSchema), remove);

export { tipoServicioRouter };
