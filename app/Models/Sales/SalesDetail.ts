import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Sale from "./Sale";
import ProductBranches from "../Products/ProductBranches";

export default class SalesDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public sale_id: number;

  @column()
  public product_branche_id: number;

  @column()
  public quantity: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => Sale, {
    foreignKey: "sale_id"
  })
  public sale: BelongsTo<typeof Sale>;

  @belongsTo(() => ProductBranches, {
    foreignKey: "product_branche_id"
  })
  public productBranch: BelongsTo<typeof ProductBranches>;
}
