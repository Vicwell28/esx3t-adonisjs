import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import State from "./State";
import Branch from "../Branches/Branch";
import User from "../Users/User";

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public state_id: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => State, {
    foreignKey: "state_id"
  })
  public state: BelongsTo<typeof State>;

  @hasMany(() => Branch, {
    foreignKey: "city_id"
  })
  public branches: HasMany<typeof Branch>;

  @hasMany(() => User, {
    foreignKey: "city_id"
  })
  public user: HasMany<typeof User>;
}
