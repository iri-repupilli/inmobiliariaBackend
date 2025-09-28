import { z } from 'zod';

export const FindOneUsuarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});

export const AddUsuarioSchema = z.object({
  body: z.object({
    nombre: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45),
    apellido: z.string().trim().min(1, 'El apellido no puede estar vacío').max(45),
    email: z.string().email('El texto debe tener formato de email').trim().max(45),
    password: z.string().trim().min(8, 'La contraseña debe tener al menos 8 caracteres').max(45),
    telefono: z.string().trim().regex(/^\d+$/, 'El telefono debe contener solo numeros').max(45),
    rol: z.string().min(1, 'Se necesita el rol').max(45),
  }),
  params: z.object().optional(),
  query: z.object().optional(),
});

export const UpdateUsuarioSchema = z.object({
  body: z.object({
    nombre: z.string().trim().min(1, 'El nombre no puede estar vacío').max(45).optional(),
    apellido: z.string().trim().min(1, 'El apellido no puede estar vacío').max(45).optional(),
    email: z.string().email('El texto debe tener formato de email').trim().max(45).optional(),
    password: z.string().trim().min(8, 'La contraseña debe tener al menos 8 caracteres').max(45).optional(),
    telefono: z.string().trim().regex(/^\d+$/, 'El telefono debe contener solo numeros').max(45).optional(),
    rol: z.string().min(1, 'Se necesita el rol').max(45).optional(),
  }),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});

export const RemoveUsuarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().trim().regex(/^\d+$/, 'El id debe ser un numero entero'),
  }),
  query: z.object().optional(),
});

export const LoginUsuarioSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
  params: z.object().optional(),
  query: z.object().optional(),
});
