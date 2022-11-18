import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Buyer from 'App/Models/Buyer'

export default class extends BaseSeeder {
  public async run () {
    await Buyer.createMany([
      {
        name: "Rafeu",
        email: "rafeu@email.com",
        password: "rafeu@senha"
      },
      {
        name: "Iury",
        email: "iury@email.com",
        password: "iury@senha"
      },
      {
        name: "Jao",
        email: "Jao@email.com",
        password: "Jao@senha"
      },
    ])
  }
}
