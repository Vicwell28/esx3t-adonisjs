import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import User from "../Users/User";
import SalesDetail from "./SalesDetail";

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public client_id: number;

  @column()
  public employee_id: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: 'client_id',
  })
  public client: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: 'employee_id',
  })
  public employee: BelongsTo<typeof User>;

  @hasMany(() => SalesDetail, {
    foreignKey: "sale_id",
  })
  public saleDetails: HasMany<typeof SalesDetail>;
}
