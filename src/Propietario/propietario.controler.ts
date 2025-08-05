import { Propietario } from "./propietario.entity.js";
import { orm } from "../shared/db/orm.js";
import { Request, Response, NextFunction } from "express";

const em = orm.em;
// function sanitizePropietarioInput(req: Request, res: Response, next: NextFunction) {
//   req.body.sanitizedInput = {
//     nombrePropietario: req.body.nombrePropietario,
//     apellidoPropietario: req.body.apellidoPropietario,
//     mailPropietario: req.body.mailPropietario,
//     telefonoPropietario: req.body.telefonoPropietario,
//     codPropietario: req.body.codPropietario,
//   }
  
//   Object.keys(req.body.sanitizedInput).forEach((key) => {
//     if (req.body.sanitizedInput[key] === undefined) {
//       delete req.body.sanitizedInput[key]
//     }
//   })
//   next()
// }

async function findAll(req: Request, res: Response){
  try{
    const propietarios = await em.find(Propietario, {})
    res.status(200).json({message: 'Found all propietarios', data: propietarios})
  } catch (error: any) {
    res.status(500).json({message: 'Internal server error'})
  }
}

async function findOne(req:Request, res:Response){
  try{
    const id = Number.parseInt(req.params.id);
    const propietario = await em.findOneOrFail(Propietario, {id});
    res.status(200).json({message: 'Found propietario', data: propietario});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
  // res.json({data: repository.findOne({id: req.params.id})})
}

async function add(req:Request, res:Response){
  // const input = req.body.sanitizedInput
  // const propietarioInput = new Propietario(input.nombrePropietario, input.apellidoPropietario, input.mailPropietario, input.telefonoPropietario)
  // const propietario = repository.add(propietarioInput)
  // res.status(201).send({message: 'Propietary created', data: propietario})
  try{
    const propietario = em.create(Propietario, req.body)
    await em.flush()
    res.status(201).json({message: 'Propietary created', data: propietario})
  }catch(error:any){
    res.status(500).json({message: 'Internal server error'})
  }
}

async function update(req:Request, res:Response){
  // req.body.sanitizedInput.codPropietario = req.params.id
  // const propietario = repository.update(req.body.sanitizedInput)
  
  // if(!propietario){
  //   res.status(404).send({message : 'Not found the propietary'})
  // } else{
  //   res.status(200).send({message: 'Character modified', data: propietario})
  // }
  try{
    const id = Number.parseInt(req.params.id);
    const propietario = em.getReference(Propietario, id);
    em.assign(propietario, req.body);
    await em.flush();
    res.status(200).json({message: 'Propietary updated', data: propietario});
  }catch(error:any){
    res.status(500).json({message: 'Internal server error'})
  }
}

async function remove(req:Request, res:Response){
  // const id = req.params.id
  // const propietario = repository.remove({id})
  // if (!propietario) {
  //   res.status(404).send({message: 'Not found propietary'})
  // }
  // res.status(200).send({messagge: 'Propietary deleted', data: propietario})
  try{
    const id = Number.parseInt(req.params.id);
    const propietario = em.getReference(Propietario, id);
    await em.removeAndFlush(propietario);
    res.status(200).json({message: 'Propietary deleted'});
  }catch(error:any){
    res.status(500).json({message: 'Internal server error'})
  } 
}

export {findAll, findOne, add, update, remove}