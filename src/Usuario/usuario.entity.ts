import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Entity, Property, OneToMany, Cascade, Collection } from '@mikro-orm/core';
import { Resena } from '../Resena/resena.entity.js';
import { Consulta } from '../Consulta/consulta.entity.js';
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
  @OneToMany(() => Consulta, (consulta) => consulta.usuario, {
    cascade: [Cascade.ALL],
  })
  consultas = new Collection<Consulta>(this);
}
