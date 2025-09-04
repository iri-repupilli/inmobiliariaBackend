import { z } from "zod";
export const findOneInmuebleSchema = z.object({
  body: z.object().optional(),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});

export const addInmuebleSchema = z.object({
  body: z.object({
    tipo: z.enum(
      ["casa", "departamento", "cochera", "terreno"],
      "Tipo requerido"
    ),
    mtrs: z.number("metros son necesarios").nonnegative(),
    descripcion: z.string().nonempty("la descripcion es necesaria"),
    antiguedad: z.number("antiguedad es necesaria").nonnegative(),
    fechaPublicacion: z
      .string("La fecha es necesaria")
      .transform((str) => new Date(str)),
    requisitos: z.string("requisitos son necesarios"),
    propietario: z.number("El ID del propietario es necesario"),
    tipoServicio: z.number("El ID del tipoServicio es necesario"),
    localidad: z.number("El ID localidad es necesaria"),
    cantAmbientes: z.number().optional(),
    cantBanios: z.number().optional(),
    patio: z.boolean().optional(), // Casa
    pileta: z.boolean().optional(), // Casa
    balcon: z.boolean().optional(), // Departamento
    techo: z.boolean().optional(), // Cochera
    tipoVehiculo: z.string().optional(), // Cochera
    ancho: z.number().optional(), // Terreno
    largo: z.number().optional(), // Terreno
    superficieTotal: z.number().optional(), // Terreno
    nroParcela: z.number().optional(), // Terreno
    zonificacion: z.string().optional(), // Terreno
  }),
  params: z.object().optional(),
  query: z.object({}).optional(),
});
export const updateInmuebleSchema = z.object({
  body: z.object({
    tipo: z.enum(["casa", "departamento", "cochera", "terreno"]).optional(),
    mtrs: z.number().optional(),
    descripcion: z.string().nonempty().optional(),
    antiguedad: z.number().optional(),
    fechaPublicacion: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    requisitos: z.string().nonempty().optional(),
    propietario: z.number().optional(),
    tipoServicio: z.number().optional(),
    localidad: z.number().optional(),
    cantAmbientes: z.number().optional(),
    cantBanios: z.number().optional(),
    patio: z.boolean().optional(), // Casa
    pileta: z.boolean().optional(), // Casa
    balcon: z.boolean().optional(), // Departamento
    techo: z.boolean().optional(), // Cochera
    tipoVehiculo: z.string().optional(), // Cochera
    ancho: z.number().optional(), // Terreno
    largo: z.number().optional(), // Terreno
    superficieTotal: z.number().optional(), // Terreno
    nroParcela: z.number().optional(), // Terreno
    zonificacion: z.string().optional(), // Terreno
  }),
  params: z.object({ id: z.string().nonempty() }),
  query: z.object({}).optional(),
});
export const deleteInmuebleSchema = z.object({
  body: z.object().optional(),
  params: z.object({
    id: z.string().nonempty(),
  }),
  query: z.object({}).optional(),
});
