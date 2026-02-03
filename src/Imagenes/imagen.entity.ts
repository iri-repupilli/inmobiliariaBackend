import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Inmueble } from '../Inmueble/inmueble.entity.js';

@Entity()
export class Imagen extends BaseEntity {
  @Property({ nullable: false, length: 256 })
  url!: string;

  @Property({ nullable: false })
  publicId!: string;

  @ManyToOne(() => Inmueble, { nullable: false })
  inmueble!: Rel<Inmueble>;
}
