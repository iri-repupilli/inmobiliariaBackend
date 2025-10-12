import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Usuario } from '../Usuario/usuario.entity.js';
import { Inmueble } from '../Inmueble/inmueble.entity.js';

@Entity()
export class Consulta extends BaseEntity {
  @ManyToOne(() => Inmueble, { nullable: false })
  inmueble!: Rel<Inmueble>;

  @ManyToOne(() => Usuario, { nullable: false })
  usuario!: Rel<Usuario>;

  @Property({ nullable: true, default: 'El usuario NO realizó comentarios' })
  descripcion!: string;

  @Property({ nullable: true })
  respuesta?: string;
}
