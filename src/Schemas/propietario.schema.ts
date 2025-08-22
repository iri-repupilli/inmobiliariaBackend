import { query } from 'express';
import { z } from 'zod';

export const FindOnePropietarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object().optional(),
});

export const AddPropietarioSchema = z.object({
  body: z.object({
    nombrePropietario: z
      .string('Se necesita el nombre')
      .min(1)
      .max(45)
      .nonempty(),
    apellidoPropietario: z
      .string('Se necesita el apellido')
      .min(1)
      .max(45)
      .nonempty(),
    mailPropietario: z.email().min(1).max(45).nonempty('Se necesita el email'),
    telefonoPropietario: z
      .string('Se necesita el telefono')
      .min(1)
      .max(45)
      .nonempty(),
  }),
  params: z.object().optional(),
  query: z.object().optional(),
});

export const UpdatePropietarioSchema = z.object({
  body: z.object({
    nombrePropietario: z.string().min(1).max(45).optional(),
    apellidoPropietario: z.string().min(1).max(45).optional(),
    mailPropietario: z.email().min(1).max(45).optional(),
    telefonoPropietario: z.string().min(1).max(45).optional(),
  }),
  params: z.object({
    id: z.string().nonempty().min(1),
  }),
  query: z.object().optional(),
});

export const RemovePropietarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object().optional(),
});
