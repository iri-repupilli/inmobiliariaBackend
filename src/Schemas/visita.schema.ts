import { z } from 'zod';
export const findOneVisitaSchema = z.object({
  body: z.object().optional(),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});

export const addVisitaSchema = z.object({
  body: z.object({
    datevisita: z
      .string('La fecha es necesaria')
      .transform((str) => new Date(str)),
    descriptionvisita: z.string().optional(),
    inmueble: z.number('El ID del inmueble es necesario'),
    usuario: z.number('El ID del usuario es necesario'),
    telefonoContacto: z.string('El telefono es necesario'),
    estado: z.string('El estado es obligatorio'),
  }),
  params: z.object().optional(),
  query: z.object({}).optional(),
});
export const updateVisitaSchema = z.object({
  body: z.object({
    datevisita: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    descriptionvisita: z.string().optional(),
    inmueble: z.number().optional(),
    usuario: z.number().optional(),
    telefonoContacto: z.string().optional(),
    estado: z.string().optional(),
  }),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});
export const deleteVisitaSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});
