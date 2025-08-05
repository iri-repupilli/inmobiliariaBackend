import { findAll, findOne, add, update, remove } from "./tipoServicio.controler.js";
import { Router } from "express";

const tipoServicioRouter = Router();

tipoServicioRouter.get("/", findAll);
tipoServicioRouter.get("/:id", findOne);
tipoServicioRouter.post("/", add);
tipoServicioRouter.put("/:id", update);
tipoServicioRouter.delete("/:id", remove);

export { tipoServicioRouter };
