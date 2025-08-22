import { z } from 'zod';

export const FindOneUsuarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object().optional(),
});

export const AddUsuarioSchema = z.object({
  body: z.object({
    nombre: z.string('Se necesita el nombre').min(1).max(45).nonempty(),
    apellido: z.string('Se necesita el apellido').min(1).max(45).nonempty(),
    email: z.email().min(1).max(45).nonempty(),
    password: z.string('Se necesita la contrasena').min(1).max(45).nonempty(),
    telefono: z.string('Se necesita el telefono').min(1).max(45).nonempty(),
    rol: z.string('Se necesita el rol').min(1).max(45).nonempty(),
  }),
  params: z.object().optional(),
  query: z.object().optional(),
});

export const UpdateUsuarioSchema = z.object({
  body: z.object({
    nombre: z.string('Se necesita el nombre').min(1).max(45).optional(),
    apellido: z.string('Se necesita el apellido').min(1).max(45).optional(),
    email: z.email().min(1).max(45).optional(),
    password: z.string('Se necesita la contrasena').min(1).max(45).optional(),
    telefono: z.string('Se necesita el telefono').min(1).max(45).optional(),
    rol: z.string('Se necesita el rol').min(1).max(45).optional(),
  }),
  params: z.object({
    id: z.string().nonempty().min(1),
  }),
  query: z.object().optional(),
});

export const RemoveUsuarioSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object().optional(),
});
