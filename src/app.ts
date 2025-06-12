import express from 'express'
import { propietarioRouter } from './Propietario/propietario.routes.js';

//defino la app
const app = express();

app.use(express.json())

app.use('/api/propietarios', propietarioRouter)
//defino el puerto por donde va a escuchar
app.listen(3000, ()=>{
  console.log('Servidor corriendo en http://localhost:3000/');
})