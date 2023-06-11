import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public date_order: DateTime;

  @column()
  public client_id: number;

  //TODO: AGREGAR RELACION
  
  @column()
  public employee_id: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
