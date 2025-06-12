import { Router } from "express";
import { findAll, findOne, add, update, remove , sanitizePropietarioInput} from "./propietario.controler.js";
export const propietarioRouter = Router()

propietarioRouter.get('/', findAll)
propietarioRouter.get('/:id', findOne)
propietarioRouter.post('/',sanitizePropietarioInput, add)
propietarioRouter.put('/:id',sanitizePropietarioInput, update)
propietarioRouter.patch('/:id',sanitizePropietarioInput, update)
propietarioRouter.delete('/:id', remove)