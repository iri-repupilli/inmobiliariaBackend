import { findAll, findOne, add, update, remove } from "./usuario.controler.js";
import { Router } from "express";

const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', findOne);
usuarioRouter.post('/', add);
usuarioRouter.put('/:id', update);
usuarioRouter.delete('/:id', remove);

export { usuarioRouter }