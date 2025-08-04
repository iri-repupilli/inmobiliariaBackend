import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Entity, Property } from '@mikro-orm/core';
@Entity()
export class Inmueble extends BaseEntity {
  @Property({ nullable: false })
  mtrs!: number;
  @Property({ nullable: false })
  descripcion!: string;
  @Property({ nullable: false })
  antiguedad!: number;
  @Property({ nullable: false, type: 'date' })
  fechaPublicacion!: Date;
  @Property({ nullable: false })
  requisitos!: string;
}
