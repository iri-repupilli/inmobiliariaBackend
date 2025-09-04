import { Router } from "express";
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./consulta.controller.js";
import {
  addConsultaSchema,
  updateConsultaSchema,
  deleteConsultaSchema,
  findOneConsultaSchema,
} from "../Schemas/consulta.schema.js";
import { schemaValidation } from "../MiddleWares/schemaValidator.middleware.js";

export const consultaRouter = Router();

consultaRouter.get("/", findAll);
consultaRouter.get("/:id", schemaValidation(findOneConsultaSchema), findOne);
consultaRouter.post("/", schemaValidation(addConsultaSchema), add);
consultaRouter.put("/:id", schemaValidation(updateConsultaSchema), update);
consultaRouter.delete("/:id", schemaValidation(deleteConsultaSchema), remove);
