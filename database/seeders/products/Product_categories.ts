import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ProductCategory from "App/Models/Products/ProductCategory";

export default class extends BaseSeeder {
  public async run() {
    await ProductCategory.createMany([
      {
        name: "Electrónica",
        description: "Productos electrónicos de última generación."
      },
      {
        name: "Seguridad",
        description: "Sistemas de seguridad para hogar y negocio."
      },
      {
        name: "Automatización",
        description: "Productos para convertir tu hogar en un espacio inteligente."
      }

    ]);
  }
}
