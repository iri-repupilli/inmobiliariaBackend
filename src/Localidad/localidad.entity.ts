import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Localidad extends BaseEntity {
  @Property({unique : true, nullable : false})
  codPostal!: number;
  @Property({length: 45,nullable: false})
  nombre!: string;
}