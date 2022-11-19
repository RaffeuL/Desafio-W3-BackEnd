import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Agency from "App/Models/Agency";

export default class extends BaseSeeder {
  public async run() {
    await Agency.createMany([
      {
        agency_number: "0001",
      },
      {
        agency_number: "0002",
      },
      {
        agency_number: "0003",
      },
      {
        agency_number: "0004",
      },
      {
        agency_number: "0005",
      },
      {
        agency_number: "0006",
      },
      {
        agency_number: "0007",
      },
      {
        agency_number: "0008",
      },
      {
        agency_number: "0009",
      },
      {
        agency_number: "0010",
      },
    ]);
  }
}
