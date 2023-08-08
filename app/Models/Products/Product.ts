import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import ProductCategory from "./ProductCategory";
import ProductBranches from "./ProductBranches";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;
  
  @column()
  public price: number;

  @column()
  public product_category_id: number;


  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => ProductCategory, {
    foreignKey: "product_category_id"
  })
  public productCategory: BelongsTo<typeof ProductCategory>;

  @hasMany(() => ProductBranches, {
    foreignKey: "product_id"
  })
  public productBranch: HasMany<typeof ProductBranches>;
}
