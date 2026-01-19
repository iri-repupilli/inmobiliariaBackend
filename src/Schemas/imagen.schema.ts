import { z } from 'zod';
export const findOneImagen = z.object({
  body: z.object().optional(),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});

export const addImagen = z.object({
  body: z.object({
    path: z.string().nonempty('La ruta es obligatoria'),
    inmueble: z.number(),
  }),
  params: z.object().optional(),
  query: z.object({}).optional(),
});
export const updateImagen = z.object({
  body: z.object({
    path: z.string().nonempty('La ruta es obligatoria'),
    inmueble: z.number(),
  }),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});
export const deleteImagen = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});
