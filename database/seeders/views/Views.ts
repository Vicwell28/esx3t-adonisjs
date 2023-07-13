import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import View from "App/Models/Views/View";

export default class extends BaseSeeder {
  public async run() {
    await View.createMany([
        {
            name: "Categories", 
            description: "",
            url: "categories",
            view_category_id: 1
        },
        {
            name: "Roles", 
            description: "",
            url: "roles",
            view_category_id: 1
        },
        {
            name: "Views", 
            description: "",
            url: "views",
            view_category_id: 1
        },
    ])
  }
}
