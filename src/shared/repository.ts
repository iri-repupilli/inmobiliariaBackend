//esta interfaz va a permitir que todos mis repositorios implementen estos elementos y que no se aleje del standar que yo quiero
export interface Repository<T>{
  findAll(): T[] | undefined; //findAll devuelve un array o undefined 
  findOne(item: {id: string}): T | undefined; // (item: {id: string}) exijo que lo que reciba por parametro sea un objeto que contenga un id, no pasa nada si trae mas datos pero si o si debe traer el id
  add(item: T): T | undefined;
  update(item: T): T | undefined;
  remove(item: {id: string}): T | undefined;
}