import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import City from "../Locations/City";
import ProductBranches from "../Products/ProductBranches";
import User from "../Users/User";

export default class Branch extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public address: string;

  @column()
  public postalCode: string;

  @column()
  public citie_id: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => City, {
    foreignKey: "citie_id"
  })
  public city: BelongsTo<typeof City>;

  @hasMany(() => ProductBranches, {
    foreignKey: "branche_id"
  })
  public productBranches: HasMany<typeof ProductBranches>;

  @hasMany(() => User, {
    foreignKey: "branche_id"
  })
  public user: HasMany<typeof User>;
}
