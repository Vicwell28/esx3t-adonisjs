import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  beforeSave,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import View from "./View";

export default class ViewCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public status: boolean;

  @hasMany(() => View, {
    foreignKey: "view_category_id",
  })
  public view: HasMany<typeof View>;

  @beforeSave()
  public static async handleNullStringFields(vc: ViewCategory) {
    if (vc.description === null || vc.description === undefined) {
      vc.description = "";
    }
  }

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
