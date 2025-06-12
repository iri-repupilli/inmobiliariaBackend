import { Repository } from "../shared/repository.js";
import { Propietario } from "./propietario.entity.js";

const propietarios = [
  new Propietario(
    'Cesar',
    'Repupilli',
    'cibercesar6@hotmail.com',
    '336425999',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
];

export class PropietarioRepository implements Repository<Propietario>{
  public findAll(): Propietario[] | undefined{
    return propietarios
  }

  public findOne(item: {id: string}): Propietario | undefined{
    return propietarios.find((propietario) => propietario.codPropietario === item.id)
  }

  public add(item: Propietario): Propietario | undefined{
    propietarios.push(item);
    return item
  }

  public update(item: Propietario): Propietario | undefined{
    const propietarioId = propietarios.findIndex((propietario) => propietario.codPropietario === item.codPropietario)
    if (propietarioId !== -1) {
      propietarios[propietarioId] = {...propietarios[propietarioId], ...item}
    }
    return item
  }

  public remove(item: { id: string; }): Propietario | undefined {
    const propietarioIdx = propietarios.findIndex((propietario) => propietario.codPropietario === item.id)
    if (propietarioIdx !== -1) {
      const deletedPropietario = propietarios[propietarioIdx]
      propietarios.splice(propietarioIdx, 1)
      return deletedPropietario
    }
  }
}