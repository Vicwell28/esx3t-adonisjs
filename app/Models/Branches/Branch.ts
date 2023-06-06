import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Branch extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public postalCode: string

  @column()
  public empleado_id : number;

  @column()
  public empleado_gte: number;

  @column()
  public productos: number;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;


// nombre, dirección, código postal, empleados 
// que trabajan en ella, empleado gerente, productos que tiene en 
// existencia.
}
