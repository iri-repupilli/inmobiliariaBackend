import { Propietario } from "./propietario.entity.js";
import { PropietarioRepository } from "./propietario.repository.js";
import { Request, Response, NextFunction } from "express";

const repository = new PropietarioRepository()

function sanitizePropietarioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombrePropietario: req.body.nombrePropietario,
    apellidoPropietario: req.body.apellidoPropietario,
    mailPropietario: req.body.mailPropietario,
    telefonoPropietario: req.body.telefonoPropietario,
  }
  
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req: Request, res: Response){
  res.json({data: repository.findAll()})
}

function findOne(req:Request, res:Response){
  res.json({data: repository.findOne({id: req.params.id})})
}

function add(req:Request, res:Response){
  const input = req.body.sanitizedInput
  const propietarioInput = new Propietario(input.nombrePropietario, input.apellidoPropietario, input.mailPropietario, input.telefonoPropietario)
  const propietario = repository.add(propietarioInput)
  res.status(201).send({message: 'Character created', data: propietario})
}

function update(req:Request, res:Response){
  req.body.sanitizedInput.id = req.params.id
  const propietario = repository.update(req.body.sanitizedInput)
  
  if(!propietario){
    res.status(404).send({message : 'Not found the character'})
  }

  res.status(200).send({message: 'Character modified', data: propietario})
}

function remove(req:Request, res:Response){
  const id = req.params.id
  const propietario = repository.remove({id})
  if (!propietario) {
    res.status(404).send({message: 'Not found propietary'})
  }
  res.status(200).send({messagge: 'Propietary deleted', data: propietario})
}

export {sanitizePropietarioInput, findAll, findOne, add, update, remove}