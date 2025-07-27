// import crypto from 'node:crypto'
// export class Propietario{
//   constructor(
//     public nombrePropietario: string,
//     public apellidoPropietario: string,
//     public mailPropietario: string,
//     public telefonoPropietario: string,
//     public codPropietario = crypto.randomUUID()
//   ) {}
// }

import { Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

export class Propietario extends BaseEntity {

  @Property({ length: 45, nullable: false})
  nombrePropietario!: string

  @Property({ length: 45, nullable: false})
  apellidoPropietario!: string

  @Property({ length: 45, nullable: false })
  mailPropietario!: string

  @Property({ length: 45, nullable: false})
  telefonoPropietario!: string

  /*
  indicamos que esta relacion apunta al inmueble, a su vez el inmueble apunta al propietario
  @OneToMany(()=> Inmueble, inmueble => inmueble.propietario, cascade: [Cascade.ALL])
  inmuebles = new Collection<Inmueble>(this);
  */

}