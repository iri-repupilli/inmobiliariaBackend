import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Entity, Property, OneToMany, Cascade, Collection } from "@mikro-orm/core";
import { Resena } from '../Resena/resena.entity.js';
import { Consulta } from "../Consulta/consulta.entity.js";
@Entity()
export class Usuario extends BaseEntity{
  @Property()
  nombre!: string;
  @Property()
  apellido!: string;
  @Property({ unique: true })
  email!: string;
  @Property()
  password!: string;
  @Property()
  telefono!: string;
  @Property()
  rol!: string;
  @OneToMany(() => Resena, (resena) => resena.usuario, {
      cascade: [Cascade.ALL],})
  resenas = new Collection<Resena>(this)
  @OneToMany(() => Consulta, (consulta) => consulta.usuario, {
      cascade: [Cascade.ALL],})
  consultas = new Collection<Consulta>(this)
}