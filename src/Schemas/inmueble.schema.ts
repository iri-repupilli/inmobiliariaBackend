import { z } from 'zod';
export const findOneInmuebleSchema = z.object({
  body: z.object().optional(),
  params: z.object({ id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero') }),
  query: z.object({}).optional(),
});

export const addInmuebleSchema = z.object({
  body: z.object({
    tipo: z.enum(['casa', 'departamento', 'cochera', 'terreno'], 'Tipo requerido'),
    mtrs: z.number('Los metros deben ser un numero entero').nonnegative(),
    descripcion: z.string().trim().min(1, 'La descripción no puede estar vacía').max(45),
    direccionCalle: z.string().trim().min(1, 'La calle no puede estar vacia').max(45),
    direccionNumero: z.string().trim().min(1, 'El numero no puede estar vacío').max(45),
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
    requisitos: z.string().trim().min(1, 'Requisitos necesarios').max(45),
    propietario: z.number('El ID del propietario es necesario').nonnegative(),
    tipoServicio: z.number('El ID del tipoServicio es necesario').nonnegative(),
    localidad: z.number('El ID localidad es necesaria').nonnegative(),
    piso: z.string().trim().regex(/^\d+$/, 'El piso debe ser un numero entero').optional(),
    depto: z.string().trim().min(1).max(45).optional(),
    cantAmbientes: z.number().nonnegative().optional(),
    cantBanios: z.number().nonnegative().optional(),
    patio: z.boolean().optional(), // Casa
    pileta: z.boolean().optional(), // Casa
    balcon: z.boolean().optional(), // Departamento
    techo: z.boolean().optional(), // Cochera
    tipoVehiculo: z.string().trim().min(1).max(45).optional(), // Cochera
    ancho: z.number().optional(), // Terreno
    largo: z.number().optional(), // Terreno
    superficieTotal: z.number().optional(), // Terreno
    nroParcela: z.number().optional(), // Terreno
    zonificacion: z.string().trim().min(1).max(45).optional(), // Terreno
  }),
  params: z.object().optional(),
  query: z.object({}).optional(),
});
export const updateInmuebleSchema = z.object({
  body: z.object({
    tipo: z.enum(['casa', 'departamento', 'cochera', 'terreno'], 'Tipo requerido').optional(),
    mtrs: z.number('Los metros deben ser un numero entero').nonnegative().optional(),
    descripcion: z.string().trim().min(1, 'La descripción no puede estar vacía').max(45).optional(),
    direccionCalle: z.string().trim().min(1, 'La calle no puede estar vacia').max(45).optional(),
    direccionNumero: z.string().trim().min(1, 'El numero no puede estar vacío').max(45).optional(),
    fechaConstruccion: z
      .string()
      .trim()
      .min(1, 'La fecha no puede estar vacía')
      .max(45)
      .transform((str) => new Date(str))
      .optional(),
    fechaPublicacion: z
      .string()
      .trim()
      .min(1, 'La fecha no puede estar vacía')
      .max(45)
      .transform((str) => new Date(str))
      .optional(),
    requisitos: z.string().trim().min(1, 'Requisitos necesarios').max(45).optional(),
    propietario: z.number('El ID del propietario es necesario').optional(),
    tipoServicio: z.number('El ID del tipoServicio es necesario').optional(),
    piso: z.string().trim().regex(/^\d+$/, 'El piso debe ser un numero entero').optional(),
    depto: z.string().trim().min(1).max(45).optional(),
    localidad: z.number('El ID localidad es necesaria').optional(),
    cantAmbientes: z.number().nonnegative().optional(),
    cantBanios: z.number().nonnegative().optional(),
    patio: z.boolean().optional(), // Casa
    pileta: z.boolean().optional(), // Casa
    balcon: z.boolean().optional(), // Departamento
    techo: z.boolean().optional(), // Cochera
    tipoVehiculo: z.string().trim().min(1).max(45).optional(), // Cochera
    ancho: z.number().optional(), // Terreno
    largo: z.number().optional(), // Terreno
    superficieTotal: z.number().optional(), // Terreno
    nroParcela: z.number().optional(), // Terreno
    zonificacion: z.string().trim().min(1).max(45).optional(), // Terreno
  }),
  params: z.object({ id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero') }),
  query: z.object({}).optional(),
});
export const deleteInmuebleSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object({}).optional(),
});
