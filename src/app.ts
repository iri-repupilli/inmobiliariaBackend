import express from 'express'
import { propietarioRouter } from './Propietario/propietario.routes.js';

//defino la app
const app = express();

app.use(express.json()) 

//llamada al crud
app.use('/api/propietarios', propietarioRouter)

app.use((_, res)=> {
  res.status(404).send({ message: 'Resource not found' })
  return //dejar el return vacio o no ponerlo si utilizo express 5.0
 })

//defino el puerto por donde va a escuchar
app.listen(3000, ()=>{
  console.log('Servidor corriendo en http://localhost:3000/');
})