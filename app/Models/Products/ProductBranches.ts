import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ProductBranches extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public stock: number;

  @column()
  public product_id: number;

  //TODO: AGREGAR RELACION

  @column()
  public branche_id: number;

  //TODO: AGREGAR RELACION

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
