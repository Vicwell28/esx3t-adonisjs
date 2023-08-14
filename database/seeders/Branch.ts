import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Branch from "App/Models/Branches/Branch";

export default class extends BaseSeeder {
  public async run() {
    await Branch.createMany([
      {
        name: "ESX3T Torreón Reforma",
        address: "Blvrd Diagonal Reforma 1930-B, Abastos.",
        postalCode: "27020",
        citie_id: 1,
      },
      {
        name: "ESX3T Torreón Manuel Lopez",
        address: "C. Manuel López Cotilla 51, Centro.",
        postalCode: "44100",
        citie_id: 1,
      },
      {
        name: "ESX3T Torreón Guadalupe",
        address: "Av Guadalupe 4277-Loc. B, Cd de los Niños.",
        postalCode: "45040",
        citie_id: 1,
      },
      {
        name: "ESX3T Torreón",
        address: "Blvrd Diagonal Reforma 1930-B, Abastos",
        postalCode: "27020",
        citie_id: 1,
      },
      {
        name: "ESX3T San Luis Benito Juárez",
        address:
          "San Luis Potosí 214-Loc. 201, C. U. Benito Juárez, Cuauhtémoc.",
        postalCode: "06700",
        citie_id: 1,
      },
    ]);
  }
}
