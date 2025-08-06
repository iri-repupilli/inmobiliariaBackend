import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Entity, Property, ManyToOne, Rel, OneToMany, Cascade, Collection } from '@mikro-orm/core';
import { Propietario } from '../Propietario/propietario.entity.js';
import { TipoServicio } from '../TipoServicio/tipoServicio.entity.js';
import { Resena } from '../Resena/resena.entity.js';
import { Consulta } from '../Consulta/consulta.entity.js';
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
  propietario!: Rel<Propietario>;
  @ManyToOne(()=> TipoServicio, {nullable: false})
  tipoServicio!: Rel<TipoServicio>;
  @OneToMany(() => Resena, (resena) => resena.inmueble, {
    cascade: [Cascade.ALL],
  })
  resenas = new Collection<Resena>(this)
  @OneToMany(() => Consulta, (consulta) => consulta.inmueble, {
    cascade: [Cascade.ALL],
  })
  consultas = new Collection<Consulta>(this)

}
