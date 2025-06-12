import crypto from 'node:crypto'
export class Propietario{
  constructor(
    public nombrePropietario: string,
    public apellidoPropietario: string,
    public mailPropietario: string,
    public telefonoPropietario: string,
    public codPropietario = crypto.randomUUID()
  ) {}
}