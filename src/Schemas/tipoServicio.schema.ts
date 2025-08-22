import { z } from 'zod';

export const FindOneTipoServicioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});

export const AddTipoServicioSchema = z.object({
  body: z.object({
    nombreTipoServicio: z.string().nonempty('Se necesita el nombre').min(1),
    descripcionTipoServicio: z
      .string()
      .nonempty('Se necesita la descripcion')
      .min(1),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const UpdateTipoServicioSchema = z.object({
  body: z.object({
    nombreTipoServicio: z.string().optional(),
    descripcionTipoServicio: z.string().optional(),
  }),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});

export const RemoveTipoServicioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});

// export type AddTipoServicioSchema = z.infer<
//   typeof AddTipoServicioSchema
// >['body'];
