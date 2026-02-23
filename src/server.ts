import 'dotenv/config';
import app from './app.js';
import { syncSchema } from './shared/db/orm.js';

await syncSchema();

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/');
});
