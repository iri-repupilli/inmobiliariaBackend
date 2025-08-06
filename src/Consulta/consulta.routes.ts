import { Router } from 'express'
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './consulta.controller.js'

export const consultaRouter = Router()

consultaRouter.get('/', findAll)
consultaRouter.get('/:id', findOne)
consultaRouter.post('/', add)
consultaRouter.put('/:id', update)
consultaRouter.delete('/:id', remove)