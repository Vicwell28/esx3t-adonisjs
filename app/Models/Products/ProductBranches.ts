import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import Branch from "../Branches/Branch";
import OrderDetail from "../Orders/OrderDetail";
import SalesDetail from "../Sales/SalesDetail";

export default class ProductBranches extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public stock: number;

  @column()
  public product_id: number;

  @column()
  public branche_id: number;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => Product, {
    foreignKey: "product_id"
  })
  public product: BelongsTo<typeof Product>;

  @belongsTo(() => Branch, {
    foreignKey: "branche_id"
  })
  public branch: BelongsTo<typeof Branch>;

  @hasMany(() => OrderDetail, {
    foreignKey: "product_branche_id",
  })
  public productBranch: HasMany<typeof OrderDetail>;

  @hasMany(() => SalesDetail, {
    foreignKey: "product_branche_id",
  })
  public salesDetail: HasMany<typeof SalesDetail>;
}
