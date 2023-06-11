import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import View from "../Views/View";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public status: boolean;

  @hasMany(() => User, {
    foreignKey: "role_id",
  })
  public user: HasMany<typeof User>;

  @manyToMany(() => View, {
    localKey: "id",
    pivotForeignKey: "role_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "view_id",
    pivotTable: "role_views",
  })
  public views: ManyToMany<typeof View>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
