import { z } from 'zod';
export const findOneConsulta = z.object({
  body: z.object().optional(),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});

export const addConsulta = z.object({
  body: z.object({
    descripcion: z.string().nonempty('La descripcion es obligatorio'),
    inmueble: z.number(),
    usuario: z.number(),
    respuesta: z.string().trim().optional(),
  }),
  params: z.object().optional(),
  query: z.object({}).optional(),
});
export const updateConsulta = z.object({
  body: z.object({
    descripcion: z.string().optional(),
    inmueble: z.number().optional(),
    usuario: z.number().optional(),
    respuesta: z.string().trim().optional(),
  }),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});
export const deleteConsulta = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});
