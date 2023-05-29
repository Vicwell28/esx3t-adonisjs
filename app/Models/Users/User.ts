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

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public username: string;

  @column()
  public status: boolean;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public role_id: number;

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

}