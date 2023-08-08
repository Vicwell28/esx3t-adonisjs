import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ProductCategory from "App/Models/Products/ProductCategory";

export default class extends BaseSeeder {
  public async run() {
    await ProductCategory.createMany([
      {
        name: "Categoria 1",
        description:
          "El administrador es responsable de gestionar y supervisar todo el sistema, con acceso completo y control sobre todas las funcionalidades. .",
      },

    ]);
  }
}
