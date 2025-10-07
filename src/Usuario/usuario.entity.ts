import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import {
  Entity,
  Property,
  OneToMany,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { Resena } from '../Resena/resena.entity.js';
import { Visita } from '../Visita/visita.entity.js';
@Entity()
export class Usuario extends BaseEntity {
  @Property({ nullable: false, length: 45 })
  nombre!: string;
  @Property({ nullable: false, length: 45 })
  apellido!: string;
  @Property({ unique: true, nullable: false, length: 45 })
  email!: string;
  @Property({ nullable: false, length: 45 })
  password!: string;
  @Property({ nullable: false, length: 45 })
  telefono!: string;
  @Property({ nullable: false, length: 45 })
  rol!: string;
  @OneToMany(() => Resena, (resena) => resena.usuario, {
    cascade: [Cascade.ALL],
  })
  resenas = new Collection<Resena>(this);
  @OneToMany(() => Visita, (visita) => visita.usuario, {
    cascade: [Cascade.ALL],
  })
  Visitas = new Collection<Visita>(this);
}
