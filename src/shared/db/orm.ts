import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Consulta } from '../../Consulta/consulta.entity.js';
import { Imagen } from '../../Imagenes/imagen.entity.js';
import {
  Casa,
  Cochera,
  Departamento,
  Inmueble,
  Terreno,
} from '../../Inmueble/inmueble.entity.js';
import { Localidad } from '../../Localidad/localidad.entity.js';
import { Propietario } from '../../Propietario/propietario.entity.js';
import { TipoServicio } from '../../TipoServicio/tipoServicio.entity.js';
import { Usuario } from '../../Usuario/usuario.entity.js';
import { Visita } from '../../Visita/visita.entity.js';

const isTest = process.env.NODE_ENV === 'test';

let _orm: MikroORM;

export const getOrm = async (): Promise<MikroORM> => {
  if (!_orm) {
    _orm = await MikroORM.init({
      //indicara como encontrar los archivos de entidades
      entities: [
        Consulta,
        Imagen,
        Casa,
        Cochera,
        Departamento,
        Inmueble,
        Terreno,
        Localidad,
        Propietario,
        TipoServicio,
        Usuario,
        Visita,
      ],
      metadataProvider: isTest
        ? TsMorphMetadataProvider
        : ReflectMetadataProvider,
      dbName: 'inmobiliaria',
      //si uso type= 'mysql' no funciona, por lo que lei es de versiones anteriores de mikro-orm
      driver: MySqlDriver,
      clientUrl: 'mysql://dsw:dsw@localhost:3306/inmobiliaria',
      highlighter: new SqlHighlighter(),
      debug: true,
      schemaGenerator: {
        //never in production
        disableForeignKeys: true, //para que no falle al crear la base de datos
        createForeignKeyConstraints: true,
        ignoreSchema: [],
      },
    });
  }
  return _orm;
};

export const syncSchema = async () => {
  const orm = await getOrm();
  const generator = orm.getSchemaGenerator();
  /*
  await generator.dropSchema(); //elimina db, OJO CON ESTO SOLO USAR CUANDO FALLE EL UPDATE SCHEMA
  await generator.createSchema(); //crea db
  */
  await generator.updateSchema();
};
