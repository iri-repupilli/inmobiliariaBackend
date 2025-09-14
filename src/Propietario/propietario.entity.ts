import { Property, OneToMany, Cascade, Entity } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Inmueble } from '../Inmueble/inmueble.entity.js';
import { Collection } from '@mikro-orm/core';

@Entity()
export class Propietario extends BaseEntity {
  @Property({ length: 45, nullable: false })
  nombrePropietario!: string;

  @Property({ length: 45, nullable: false })
  apellidoPropietario!: string;

  @Property({ unique: true, length: 45, nullable: false })
  mailPropietario!: string;

  @Property({ length: 45, nullable: false })
  telefonoPropietario!: string;

  /*indicamos que esta relacion apunta al inmueble, a su vez el inmueble apunta al propietario*/
  @OneToMany(() => Inmueble, (inmueble) => inmueble.propietario, { cascade: [Cascade.ALL] })
  inmuebles = new Collection<Inmueble>(this);
}
