import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Order from "./Order";
import ProductBranches from "../Products/ProductBranches";

export default class OrderDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public order_id: number;

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

  @belongsTo(() => Order, {
    foreignKey: "order_id"
  })
  public order: BelongsTo<typeof Order>;

  @belongsTo(() => ProductBranches, {
    foreignKey: "product_branche_id",
  })
  public productBranch: BelongsTo<typeof ProductBranches>;
}
