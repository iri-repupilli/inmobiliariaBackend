import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import { SqlHighlighter} from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
  //indicara como encontrar los archivos de entidades
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*entity.ts'],
  dbName: 'inmobiliaria',
  //si uso type= 'mysql' no funciona, por lo que lei es de versiones anteriores de mikro-orm
  driver: MySqlDriver,
  clientUrl: 'mysql://dsw:dsw@localhost:3306/inmobiliaria',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {//never in production
    disableForeignKeys: true, //para que no falle al crear la base de datos
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  }
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
  await generator.dropSchema(); //elimina db, OJO CON ESTO SOLO USAR CUANDO FALLE EL UPDATE SCHEMA
  await generator.createSchema(); //crea db
  */
  await generator.updateSchema();
}