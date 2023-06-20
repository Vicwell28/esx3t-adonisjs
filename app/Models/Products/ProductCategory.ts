import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ProductCategory extends BaseModel {

  public static table = 'product_categories'

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string | null;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updated_at: DateTime;
}
