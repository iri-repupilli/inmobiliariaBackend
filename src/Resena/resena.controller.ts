import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Resena } from './resena.entity.js'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const resenas = await em.find(Resena, {})
    res
      .status(200).json({ message: 'encontradas todas las reseñas', data: resenas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const resena = await em.findOneOrFail(Resena, { id })
    res
      .status(200).json({ message: 'la reseña encontrada', data: resena })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

function validateResena(data: any) {
  if (data.puntajeresena < 1 || data.puntajeresena > 10) {
    throw new Error('Puntaje debe estar entre 1-10')
  }
}


async function add(req: Request, res: Response) {
  try {
    validateResena(req.body)
    const resena = em.create(Resena, req.body)
    await em.flush()
    res
      .status(201).json({ message: 'reseña creada', data: resena })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    validateResena(req.body)
    const id = Number.parseInt(req.params.id)
    const resena = em.getReference(Resena, id)
    em.assign(resena, req.body)
    await em.flush()
    res.status(200).json({ message: 'reseña actualizada' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const resena = em.getReference(Resena, id)
    await em.removeAndFlush(resena)
    res.status(200).send({ message: 'reseña eliminada' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne, add, update, remove }