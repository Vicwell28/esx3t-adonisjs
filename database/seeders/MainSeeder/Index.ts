import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run();
  }

  public async run() {
    await this.runSeeder(await import("../Role"));
    await this.runSeeder(await import("../State"));
    await this.runSeeder(await import("../City"));
    await this.runSeeder(await import("../User"));
    await this.runSeeder(await import("../Branch"));
    await this.runSeeder(await import("../products/Product_categories")); 
    await this.runSeeder(await import("../products/Products"));
    await this.runSeeder(await import("../products/product_branches"));
    // Views
    await this.runSeeder(await import("../views/ViewCategories"));
    await this.runSeeder(await import("../views/Views"));
    await this.runSeeder(await import("../views/RoleView"));
  }
}
