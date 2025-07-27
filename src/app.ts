import 'reflect-metadata';
import {orm, syncSchema} from './shared/db/orm.js';
import express from 'express'
import { propietarioRouter } from './Propietario/propietario.routes.js';
import { RequestContext } from '@mikro-orm/core';

//defino la app
const app = express();
app.use(express.json()) 

//luego de los middlewares base
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})
//antes de los middlewares del negocio
//llamada al crud
app.use('/api/propietarios', propietarioRouter)

app.use((_, res)=> {
  res.status(404).send({ message: 'Resource not found' })
  return //dejar el return vacio o no ponerlo si utilizo express 5.0
 })

await syncSchema() //solo en desarrollo

//defino el puerto por donde va a escuchar
app.listen(3000, ()=>{
  console.log('Servidor corriendo en http://localhost:3000/');
})