import { z } from 'zod';
export const findOneResena = z.object({
  body: z.object().optional(),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});

export const addResena = z.object({
  body: z.object({
    puntajeresena: z
      .number()
      .min(1, { message: 'El puntaje minimo es de 1' })
      .max(5, { message: 'El puntaje maximo es de 5' }),
    descriptionresena: z.string().nonempty('La descripcion es obligatorio'),
    inmueble: z.number(),
    usuario: z.number(),
  }),
  params: z.object().optional(),
  query: z.object({}).optional(),
});
export const updateResena = z.object({
  body: z.object({
    puntajeresena: z
      .number()
      .min(1, { message: 'El puntaje minimo es de 1' })
      .max(5, { message: 'El puntaje maximo es de 5' })
      .optional(),
    descriptionresena: z.string().optional(),
    inmueble: z.number().optional(),
    usuario: z.number().optional(),
  }),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});
export const deleteResena = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});
