import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ProductBranches extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public stock: string;

  @column()
  public product_id: number;

  @column()
  public branche_id: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
