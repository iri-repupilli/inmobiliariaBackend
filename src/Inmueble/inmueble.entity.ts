import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import {
  Entity,
  Property,
  ManyToOne,
  Rel,
  OneToMany,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { Propietario } from '../Propietario/propietario.entity.js';
import { TipoServicio } from '../TipoServicio/tipoServicio.entity.js';
import { Resena } from '../Resena/resena.entity.js';
import { Consulta } from '../Consulta/consulta.entity.js';
import { Localidad } from '../Localidad/localidad.entity.js';

@Entity({
  discriminatorColumn: 'tipo',
  discriminatorMap: {
    casa: 'Casa',
    departamento: 'Departamento',
    cochera: 'Cochera',
    terreno: 'Terreno',
  },
})
@Entity()
export abstract class Inmueble extends BaseEntity {
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
  @Property({ nullable: true })
  cantAmbientes!: number;

  @Property({ nullable: true })
  cantBanios!: number;

  @Property({ nullable: true })
  patio!: boolean;

  @Property({ nullable: true })
  pileta!: boolean;
}

@Entity()
export class Departamento extends Inmueble {
  @Property({ nullable: true })
  cantAmbientes!: number;

  @Property({ nullable: true })
  cantBanios!: number;

  @Property({ nullable: true })
  balcon!: boolean;
}

@Entity()
export class Cochera extends Inmueble {
  @Property({ nullable: true })
  techo!: boolean;

  @Property({ nullable: true })
  tipoVehiculo!: string;
}

@Entity()
export class Terreno extends Inmueble {
  @Property({ nullable: true })
  ancho!: number;

  @Property({ nullable: true })
  largo!: number;

  @Property({ nullable: true })
  superficieTotal!: number;

  @Property({ nullable: true })
  nroParcela!: number;

  //'residencial', 'comercial', 'industrial', 'mixta'
  @Property({ nullable: true })
  zonificacion!: string;
}
