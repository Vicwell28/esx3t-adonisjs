import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class SalesDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public sale_id: number;

  @column()
  public product_branche_id: number;

  @column()
  public quantity: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
