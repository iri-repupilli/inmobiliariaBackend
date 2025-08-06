import { Router } from 'express'
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './resena.controller.js'

export const resenaRouter = Router()

resenaRouter.get('/', findAll)
resenaRouter.get('/:id', findOne)
resenaRouter.post('/', add)
resenaRouter.put('/:id', update)
resenaRouter.delete('/:id', remove)