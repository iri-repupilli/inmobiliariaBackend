import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./localidad.controler.js";

const localidadRouter = Router();

localidadRouter.get("/", findAll);
localidadRouter.get("/:id", findOne);
localidadRouter.post("/", add);
localidadRouter.put("/:id", update);
localidadRouter.delete("/:id", remove);

export { localidadRouter };