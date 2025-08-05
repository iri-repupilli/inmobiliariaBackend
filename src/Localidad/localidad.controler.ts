import { Localidad } from "./localidad.entity.js";
import { orm } from "../shared/db/orm.js";
import { Request, Response } from "express";

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const localidades = await em.find(Localidad, {});
    res.status(200).json({message: "Found localidades", data: localidades});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.codPostal);
    const localidad = await em.findOneOrFail(Localidad, id);
    res.status(200).json({message: "Found localidad", data: localidad});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const localidad = em.create(Localidad, req.body);
    await em.persistAndFlush(localidad);
    res.status(201).json({message: "Localidad added successfully", data: localidad});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.codPostal);
    const localidad = em.getReference(Localidad,id);
    em.assign(localidad, req.body);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.codPostal);
    const localidad = em.getReference(Localidad, id);
    await em.removeAndFlush(localidad);
    res.status(200).json({message: "Localidad removed successfully"});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  } 
}
export { findAll, findOne, add, update, remove };