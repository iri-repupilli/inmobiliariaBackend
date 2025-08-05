import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Entity, Property } from "@mikro-orm/core";

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
}