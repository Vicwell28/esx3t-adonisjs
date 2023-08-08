import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import RoleView from "App/Models/Views/RoleView";

export default class extends BaseSeeder {
  public async run() {
    RoleView.createMany([
      {
        role_id: 1,
        view_id: 1,
      },
      {
        role_id: 1,
        view_id: 2,
      },
      {
        role_id: 1,
        view_id: 3,
      },
    ]);
    
  }
}
