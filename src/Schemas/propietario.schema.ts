import { query } from 'express';
import { z } from 'zod';

export const FindOnePropietarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});

export const AddPropietarioSchema = z.object({
  body: z.object({
    nombrePropietario: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45),
    apellidoPropietario: z.string().trim().min(1, 'El apellido no puede estar vacío').max(45),
    mailPropietario: z.email('El texto debe tener formato de email').trim().max(45),
    telefonoPropietario: z.string().trim().regex(/^\d+$/, 'El telefono debe contener solo numeros').max(45),
  }),
  params: z.object().optional(),
  query: z.object().optional(),
});

export const UpdatePropietarioSchema = z.object({
  body: z.object({
    nombrePropietario: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45).optional(),
    apellidoPropietario: z.string().trim().min(1, 'El apellido no puede estar vacío').max(45).optional(),
    mailPropietario: z.email('El texto debe tener formato de email').trim().max(45).optional(),
    telefonoPropietario: z.string().trim().regex(/^\d+$/, 'El telefono debe contener solo numeros').max(45).optional(),
  }),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});

export const RemovePropietarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});
