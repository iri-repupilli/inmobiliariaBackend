import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Entity, Property, OneToMany, Cascade, Collection } from '@mikro-orm/core';
import { Inmueble } from '../Inmueble/inmueble.entity.js';
@Entity()
export class TipoServicio extends BaseEntity {
  @Property({ length: 45, nullable: false })
  nombreTipoServicio!: string;

  @Property({ length: 100, nullable: false })
  descripcionTipoServicio!: string;

  @OneToMany(() => Inmueble, (inmueble) => inmueble.tipoServicio, { cascade: [Cascade.ALL] })
  inmuebles = new Collection<Inmueble>(this);
}
