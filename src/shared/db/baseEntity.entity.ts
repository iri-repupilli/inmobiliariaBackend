import { PrimaryKey } from "@mikro-orm/core";
export abstract class BaseEntity {
 @PrimaryKey()
 id?: number
 
 /*
 @property({type:DateTimeType})
 createdAt?: Date

 @property({type:DateTimeType, onUpdate: () => new Date()}, )
 onUpdateAt?:Date
  
 */
}