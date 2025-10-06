import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Entity, Property, ManyToOne, Rel, OneToMany, Cascade, Collection } from '@mikro-orm/core';
import { Propietario } from '../Propietario/propietario.entity.js';
import { TipoServicio } from '../TipoServicio/tipoServicio.entity.js';
import { Resena } from '../Resena/resena.entity.js';
import { Consulta } from '../Consulta/consulta.entity.js';
import { Localidad } from '../Localidad/localidad.entity.js';
import { property } from 'zod';

@Entity({
  discriminatorColumn: 'tipo',
  discriminatorMap: {
    casa: 'Casa',
    departamento: 'Departamento',
    cochera: 'Cochera',
    terreno: 'Terreno',
  },
})
export abstract class Inmueble extends BaseEntity {
  @Property({ nullable: false })
  mtrs!: number;
  @Property({ nullable: false, length: 45 })
  descripcion!: string;
  @Property({ nullable: false, length: 45 })
  precioDolar!: number;
  @Property({ nullable: false, length: 45 })
  direccionCalle!: string;
  @Property({ nullable: false, length: 45 })
  direccionNumero!: number;
  @Property({ nullable: false, type: 'date' })
  fechaConstruccion!: Date;
  @Property({ nullable: false, type: 'date' })
  fechaPublicacion!: Date;
  @Property({ nullable: true, length: 45 })
  requisitos?: string;
  @ManyToOne(() => Propietario, { nullable: false })
  propietario!: Rel<Propietario>;
  @ManyToOne(() => TipoServicio, { nullable: false })
  tipoServicio!: Rel<TipoServicio>;
  @ManyToOne(() => Localidad, { nullable: false })
  localidad!: Rel<Localidad>;
  @OneToMany(() => Resena, (resena) => resena.inmueble, {
    cascade: [Cascade.ALL],
  })
  resenas = new Collection<Resena>(this);
  @OneToMany(() => Consulta, (consulta) => consulta.inmueble, {
    cascade: [Cascade.ALL],
  })
  consultas = new Collection<Consulta>(this);
}

@Entity()
export class Casa extends Inmueble {
  @Property({ nullable: false })
  cantAmbientes!: number;

  @Property({ nullable: false })
  cantBanios!: number;

  @Property({ nullable: false })
  patio!: boolean;

  @Property({ nullable: false })
  pileta!: boolean;
}

@Entity()
export class Departamento extends Inmueble {
  @Property({ nullable: false , length: 45 })
  piso!: number

  @Property({ nullable: true, length: 45 })
  depto!: string;

  @Property({ nullable: false, length: 45 })
  precioExpensas!: number;

  @Property({ nullable: false })
  cantAmbientes!: number;

  @Property({ nullable: false })
  cantBanios!: number;

  @Property({ nullable: false })
  balcon!: boolean;
}

@Entity()
export class Cochera extends Inmueble {
  @Property({ nullable: false })
  techo!: boolean;

  @Property({ nullable: false, length: 45 })
  tipoVehiculo!: string;
}

@Entity()
export class Terreno extends Inmueble {
  @Property({ nullable: false })
  nroParcela!: number;

  //'residencial', 'comercial', 'industrial', 'mixta'
  @Property({ nullable: true, length: 45 })
  zonificacion!: string;
}
