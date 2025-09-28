import { z } from 'zod';

export const findOneInmuebleSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object({}).optional(),
});

// Campos base que siempre van
const baseInmueble = {
  mtrs: z.number('Los metros deben ser un numero entero').nonnegative(),
  descripcion: z.string().trim().min(1, 'La descripción no puede estar vacía').max(45),
  direccionCalle: z.string().trim().min(1, 'La calle no puede estar vacia').max(45),
  direccionNumero: z.number('numero necesario').nonnegative(),
  fechaConstruccion: z
    .string()
    .trim()
    .min(1, 'La fecha no puede estar vacía')
    .max(45)
    .transform((str) => new Date(str)),
  fechaPublicacion: z
    .string()
    .trim()
    .min(1, 'La fecha no puede estar vacía')
    .max(45)
    .transform((str) => new Date(str)),
  requisitos: z.string().trim().min(1, 'Requisitos necesarios').max(45).optional(),
  propietario: z.number('El ID del propietario es necesario').nonnegative(),
  tipoServicio: z.number('El ID del tipoServicio es necesario').nonnegative(),
  localidad: z.number('El ID localidad es necesaria').nonnegative(),
};

// Schemas por tipo
const casaSchema = z.object({
  tipo: z.literal('casa'),
  ...baseInmueble,
  cantAmbientes: z.number().nonnegative(),
  cantBanios: z.number().nonnegative(),
  patio: z.boolean(),
  pileta: z.boolean(),
});

const departamentoSchema = z.object({
  tipo: z.literal('departamento'),
  ...baseInmueble,
  piso: z.number().nonnegative(),
  depto: z.string().trim().min(1).max(45),
  cantAmbientes: z.number().nonnegative(),
  cantBanios: z.number().nonnegative(),
  balcon: z.boolean(),
});

const cocheraSchema = z.object({
  tipo: z.literal('cochera'),
  ...baseInmueble,
  techo: z.boolean(),
  tipoVehiculo: z.string().trim().min(1).max(45),
});

const terrenoSchema = z.object({
  tipo: z.literal('terreno'),
  ...baseInmueble,
  nroParcela: z.number(),
  zonificacion: z.string().trim().min(1).max(45),
});

export const addInmuebleSchema = z.object({
  body: z.discriminatedUnion('tipo', [
    casaSchema,
    departamentoSchema,
    cocheraSchema,
    terrenoSchema,
  ]),
  params: z.object().optional(),
  query: z.object({}).optional(),
});

// UPDATE: igual que add pero todos los campos opcionales
const baseUpdate = Object.fromEntries( 
  Object.entries(baseInmueble).map(([k, v]) => [k, (v as any).optional()]) 
  // esto supuestamente sirve para que todos los campos  de baseinmueble tengan .optional() sin tener 
  // que escribir uno por uno pero es lo mismo literal.
);

const casaUpdateSchema = z.object({
  tipo: z.literal('casa').optional(),
  ...baseUpdate,
  cantAmbientes: z.number().nonnegative().optional(),
  cantBanios: z.number().nonnegative().optional(),
  patio: z.boolean().optional(),
  pileta: z.boolean().optional(),
});

const departamentoUpdateSchema = z.object({
  tipo: z.literal('departamento').optional(),
  ...baseUpdate,
  piso: z.number().nonnegative(),
  depto: z.string().trim().min(1).max(45).optional(),
  cantAmbientes: z.number().nonnegative().optional(),
  cantBanios: z.number().nonnegative().optional(),
  balcon: z.boolean().optional(),
});

const cocheraUpdateSchema = z.object({
  tipo: z.literal('cochera').optional(),
  ...baseUpdate,
  techo: z.boolean().optional(),
  tipoVehiculo: z.string().trim().min(1).max(45).optional(),
});

const terrenoUpdateSchema = z.object({
  tipo: z.literal('terreno').optional(),
  ...baseUpdate,
  nroParcela: z.number().optional(),
  zonificacion: z.string().trim().min(1).max(45).optional(),
});

export const updateInmuebleSchema = z.object({
  body: z.discriminatedUnion('tipo', [
    casaUpdateSchema,
    departamentoUpdateSchema,
    cocheraUpdateSchema,
    terrenoUpdateSchema,
  ]),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object({}).optional(),
});

export const deleteInmuebleSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object({}).optional(),
});
