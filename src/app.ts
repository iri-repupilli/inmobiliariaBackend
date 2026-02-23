import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';

import { propietarioRouter } from './Propietario/propietario.routes.js';
import { inmuebleRouter } from './Inmueble/inmueble.routes.js';
import { tipoServicioRouter } from './TipoServicio/tipoServicio.routes.js';
import { usuarioRouter } from './Usuario/usuario.routes.js';
import { localidadRouter } from './Localidad/localidad.routes.js';
import { consultaRouter } from './Consulta/consulta.routes.js';
import { visitaRouter } from './Visita/visita.routes.js';
import { imagenRouter } from './Imagenes/imagen.routes.js';
import swaggerUi from 'swagger-ui-express';
import specs from './shared/docs/swagger.js';
import cookieParser from 'cookie-parser';
import { getOrm } from './shared/db/orm.js';
import cors from 'cors';
import { RequestContext } from '@mikro-orm/core';
//defino la app
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json());
//para leer cookies (en especial la de jwt)
app.use(cookieParser());

//luego de los middlewares base
app.use(async (req, res, next) => {
  const orm = await getOrm();
  RequestContext.create(orm.em, next);
});
//antes de los middlewares del negocio
//llamada al crud
app.use('/api/localidades', localidadRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/tiposervicios', tipoServicioRouter);
app.use('/api/propietarios', propietarioRouter);
app.use('/api/inmuebles', inmuebleRouter);
app.use('/api/consultas', consultaRouter);
app.use('/api/visitas', visitaRouter);
app.use('/api/imagenes', imagenRouter);

//DOCUMENTACION
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      withCredentials: true,
    },
  }),
);

app.use((_, res) => {
  res.status(404).send({ message: 'Resource not found' });
  return; //dejar el return vacio o no ponerlo si utilizo express 5.0
});

export default app;
