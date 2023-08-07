import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import View from "App/Models/Views/View";

export default class extends BaseSeeder {
  public async run() {
    await View.createMany([
      {
        name: "Categories",
        description: "",
        url: "categories",
        view_category_id: 1,
      },
      {
        name: "Views",
        description: "",
        url: "views",
        view_category_id: 1,
      },
      {
        name: "Roles",
        description: "",
        url: "roles",
        view_category_id: 1,
      },
      {
        name: "Users",
        description: "",
        url: "users",
        view_category_id: 2,
      },
      {
        name: "Sale",
        description: "",
        url: "sales",
        view_category_id: 3,
      },
      {
        name: "Sales Detail",
        description: "",
        url: "sales/detail",
        view_category_id: 3,
      },
      {
        name: "Products",
        description: "",
        url: "products",
        view_category_id: 4,
      },
      {
        name: "Products Categories",
        description: "",
        url: "products/categories",
        view_category_id: 4,
      },
      {
        name: "Products Branches",
        description: "",
        url: "products/branches",
        view_category_id: 4,
      },
      {
        name: "Orders",
        description: "",
        url: "orders",
        view_category_id: 5,
      },
      {
        name: "Orders Details",
        description: "",
        url: "orders/detail",
        view_category_id: 5,
      },
      {
        name: "States",
        description: "",
        url: "states",
        view_category_id: 6,
      },
      {
        name: "Cities",
        description: "",
        url: "Cities",
        view_category_id: 6,
      },
      {
        name: "Branches",
        description: "",
        url: "branches",
        view_category_id: 7,
      },
    ]);
  }
}
