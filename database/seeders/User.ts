import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/Users/User";

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: "admin",
        email: "admin@gmail.com",
        password: "admin",
        role_id: 1,
      },
    ]);
  }
}
