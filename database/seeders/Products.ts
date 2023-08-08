import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Product from "App/Models/Products/Product";

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        name: "Camara de Seguridad",
        description: "Blvrd Diagonal Reforma 1930-B, Abastos",
        price: 500,
        product_category_id: 1,
      },
      {
        name: "Camara de Seguridad",
        description: "Blvrd Diagonal Reforma 1930-B, Abastos",
        price: 500,
        product_category_id: 1,
      }, {
        name: "Camara de Seguridad",
        description: "Blvrd Diagonal Reforma 1930-B, Abastos",
        price: 500,
        product_category_id: 1,
      }, {
        name: "Camara de Seguridad",
        description: "Blvrd Diagonal Reforma 1930-B, Abastos",
        price: 500,
        product_category_id: 1,
      },
    
    ]);
  }
}

