import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Inmueble } from '../Inmueble/inmueble.entity.js';

@Entity()
export class Localidad extends BaseEntity {
  @Property({ unique: true, length: 45, nullable: false })
  codPostal!: string;
  @Property({ length: 45, nullable: false })
  nombre!: string;
  @OneToMany(() => Inmueble, (inmueble) => inmueble.localidad, {
    cascade: [Cascade.ALL],
  })
  inmuebles = new Collection<Inmueble>(this);
}
