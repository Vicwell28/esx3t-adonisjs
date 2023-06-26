import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
} from "@ioc:Adonis/Lucid/Orm";
import Role from "./Role";
import City from "../Locations/City";
import Branch from "../Branches/Branch";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public username: string;

  @column()
  public fname: string;

  @column()
  public lname: string;

  @column()
  public date_birth: DateTime;

  @column()
  public rfc: string;

  @column()
  public address: string;

  @column()
  public postal_code: string;

  @column()
  public status: boolean;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public role_id: number;

  @column()
  public city_id: number;

  @column()
  public branche_id: number;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @belongsTo(() => Role, {
    foreignKey: "role_id",
  })
  public role: BelongsTo<typeof Role>;

  @belongsTo(() => City, {
    foreignKey: "city_id",
  })
  public city: BelongsTo<typeof City>;

  @belongsTo(() => Branch, {
    foreignKey: "branche_id",
  })
  public branch: BelongsTo<typeof Branch>;
}
