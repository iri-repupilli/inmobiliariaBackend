import { z } from 'zod';

export const FindOneLocalidadSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object().optional(),
});

export const AddLocalidadSchema = z.object({
  body: z.object({
    codPostal: z.number().nonnegative().nonoptional(),
    nombre: z.string('Se necesita el nombre').min(1).max(45).nonempty(),
  }),
  params: z.object().optional(),
  query: z.object().optional(),
});

export const UpdateLocalidadSchema = z.object({
  body: z.object({
    codPostal: z.number().nonnegative().optional(),
    nombre: z.string('Se necesita el nombre').min(1).max(45).optional(),
  }),
  params: z.object({
    id: z.string().nonempty().min(1),
  }),
  query: z.object().optional(),
});

export const RemoveLocalidadSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object().optional(),
});
