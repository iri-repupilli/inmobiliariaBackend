import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Usuario } from '../Usuario/usuario.entity.js';
import { Inmueble } from '../Inmueble/inmueble.entity.js';

@Entity()
export class Visita extends BaseEntity {
  @ManyToOne(() => Inmueble, { nullable: false })
  inmueble!: Rel<Inmueble>;

  @ManyToOne(() => Usuario, { nullable: false })
  usuario!: Rel<Usuario>;

  @Property({ type: 'date', nullable: false })
  datevisita!: Date;
  @Property({
    nullable: false,
  })
  telefonoContacto!: string;

  @Property({
    nullable: true,
    default: 'El agente inmobiliario NO realizó comentarios',
  })
  descriptionvisita!: string;
  @Property({ nullable: true, default: 'El estado es obligatorio' })
  estado!: string;
}
