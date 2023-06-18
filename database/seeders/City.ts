import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import City from "App/Models/Locations/City";

export default class extends BaseSeeder {
  public async run() {
    await City.createMany([
      {
        name: "Torreón",
        state_id: 7,
      },
      {
        name: "Monclova",
        state_id: 7,
      },
      {
        name: "Ciudad de México",
        state_id: 6,
      },
      {
        name: "Saltillo",
        state_id: 7,
      },
      {
        name: "Monterrey",
        state_id: 20,
      },
      {
        name: "Guadalajara",
        state_id: 24,
      },
      {
        name: "Zapopan",
        state_id: 24,
      },
    ]);
  }
}
