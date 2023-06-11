import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import View from "./View";
import Role from "../Users/Role";

export default class RoleView extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public view_id: number;

  @column()
  public role_id: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => View)
  public view: BelongsTo<typeof View>;

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>;
}
