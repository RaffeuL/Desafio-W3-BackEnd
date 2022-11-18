import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Courier from 'App/Models/Courier'

export default class extends BaseSeeder {
  public async run () {
    await Courier.createMany([
      {
        name: "Hantani",
        email: "hantani@email.com",
        password: "hantani@senha"
      },
      {
        name: "Edurdo",
        email: "edurdo@email.com",
        password: "edurdo@senha"
      },
      {
        name: "Jojane",
        email: "jojane@email.com",
        password: "jojane@senha"
      },
    ])
  }
}
