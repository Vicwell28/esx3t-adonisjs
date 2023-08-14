import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import City from "App/Models/Locations/City";

export default class extends BaseSeeder {
  public async run() {
    await City.createMany([
      {
        name: "Torreón",
        state_id: 8,
      },
      {
        name: "Gomez",
        state_id: 10,
      },
      {
        name: "Lerdo",
        state_id: 10,
      },
      {
        name: "Monclova",
        state_id: 8,
      },
      {
        name: "Saltillo",
        state_id: 8,
      },
      {
        name: "Monterrey",
        state_id: 19,
      },
      {
        name: "Guadalajara",
        state_id: 15,
      },
      {
        name: "Zapopan",
        state_id: 15,
      },
    ]);
  }
}
