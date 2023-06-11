import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  beforeSave,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import ViewCategory from "./ViewCategory";
import Role from "../Users/Role";

export default class View extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public view_category_id: number;

  @column()
  public status: boolean;

  @belongsTo(() => ViewCategory, {
    foreignKey: "view_category_id",
  })
  public viewCategory: BelongsTo<typeof ViewCategory>;

  @beforeSave()
  public static async handleNullStringFields(view: View) {
    if (view.description === null || view.description === undefined) {
      view.description = "";
    }
  }

  @manyToMany(() => Role, {
    localKey: "id",
    pivotForeignKey: "view_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "role_id",
    pivotTable: "role_views",
  })
  public views: ManyToMany<typeof Role>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
