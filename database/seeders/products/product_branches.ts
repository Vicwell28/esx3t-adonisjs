import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ProductBranches from "App/Models/Products/ProductBranches";

export default class extends BaseSeeder {
  public async run() {
    await ProductBranches.createMany([
      {
        product_id: 1,
        branche_id: 1,
        stock: 10,
      },
      {
        product_id: 2,
        branche_id: 1,
        stock: 10,
      },
      {
        product_id: 3,
        branche_id: 1,
        stock: 10,
      },
      {
        product_id: 4,
        branche_id: 1,
        stock: 10,
      },
      {
        product_id: 1,
        branche_id: 2,
        stock: 10,
      },
      {
        product_id: 2,
        branche_id: 3,
        stock: 10,
      },
      {
        product_id: 3,
        branche_id: 2,
        stock: 10,
      },
      {
        product_id: 4,
        branche_id: 3,
        stock: 10,
      },
      {
        product_id: 5,
        branche_id: 4,
        stock: 10,
      },
    ]);
  }
}
