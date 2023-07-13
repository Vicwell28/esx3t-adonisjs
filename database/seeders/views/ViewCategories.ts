import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ViewCategory from "App/Models/Views/ViewCategory";

export default class extends BaseSeeder {
  public async run() {
    await ViewCategory.createMany([
      {
        name: "Views",
      },
      {
        name: "Users",
      },
      {
        name: "Sales",
      },
      {
        name: "Products",
      },
      {
        name: "Orders",
      },
      {
        name: "Locations",
      },
      {
        name: "Branches",
      },
    ]);
  }
}
