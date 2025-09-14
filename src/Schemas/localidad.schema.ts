import { z } from 'zod';

export const FindOneLocalidadSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});

export const AddLocalidadSchema = z.object({
  body: z.object({
    codPostal: z.string().trim().regex(/^\d+$/, 'El codigo postal debe ser un numero entero').max(45),
    nombre: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45),
  }),
  params: z.object().optional(),
  query: z.object().optional(),
});

export const UpdateLocalidadSchema = z.object({
  body: z.object({
    codPostal: z.string().trim().regex(/^\d+$/, 'El codigo postal debe ser un numero entero').max(45).optional(),
    nombre: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45).optional(),
  }),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});

export const RemoveLocalidadSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});
