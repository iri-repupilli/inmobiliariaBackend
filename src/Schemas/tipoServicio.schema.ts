import { z } from 'zod';

export const FindOneTipoServicioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object({}).optional(),
});

export const AddTipoServicioSchema = z.object({
  body: z.object({
    nombreTipoServicio: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45),
    descripcionTipoServicio: z.string().trim().min(1, 'La descripcion no puede estar vacía').max(100),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const UpdateTipoServicioSchema = z.object({
  body: z.object({
    nombreTipoServicio: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45).optional(),
    descripcionTipoServicio: z.string().trim().min(1, 'La descripcion no puede estar vacía').max(100).optional(),
  }),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object({}).optional(),
});

export const RemoveTipoServicioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object({}).optional(),
});

// export type AddTipoServicioSchema = z.infer<
//   typeof AddTipoServicioSchema
// >['body'];
