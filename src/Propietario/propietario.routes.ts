import { Router } from "express";
import { findAll, findOne, add, update, remove} from "./propietario.controler.js";
export const propietarioRouter = Router()

propietarioRouter.get('/', findAll)
propietarioRouter.get('/:id', findOne)
propietarioRouter.post('/', add)
propietarioRouter.put('/:id', update)
propietarioRouter.patch('/:id', update)
propietarioRouter.delete('/:id', remove)