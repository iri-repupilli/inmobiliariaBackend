import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Propietario } from '../Propietario/propietario.entity.js';
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
  @ManyToOne(()=> Propietario, {nullable: false})
  propietario!: Propietario;

}
