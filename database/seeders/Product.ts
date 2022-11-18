import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  // IDs
  // 1 - Frutas
  // 2 - Carnes Vermelhas
  // 3 - Peixes
  public async run () {
    await Product.createMany([
      {
        name: "Banana",
        category_id: 1,
        price: 3
      },
      {
        name: "Bisteca",
        category_id: 2,
        price: 30
      },
      {
        name: "Dourada",
        category_id: 3,
        price: 15
      }
    ])
  }
}
