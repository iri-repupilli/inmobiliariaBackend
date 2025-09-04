import { z } from "zod";
export const findOneConsultaSchema = z.object({
  body: z.object().optional(),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});

export const addConsultaSchema = z.object({
  body: z.object({
    dateconsulta: z.string().transform((str) => new Date(str)),
    descriptionconsulta: z.string().optional(),
    inmueble: z.number(),
    usuario: z.number(),
  }),
  params: z.object().optional(),
  query: z.object({}).optional(),
});
export const updateConsultaSchema = z.object({
  body: z.object({
    dateconsulta: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    descriptionconsulta: z.string().optional(),
    inmueble: z.number().optional(),
    usuario: z.number().optional(),
  }),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});
export const deleteConsultaSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});
