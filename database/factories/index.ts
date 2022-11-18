// import Factory from '@ioc:Adonis/Lucid/Factory'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Buyer from 'App/Models/Buyer'
import Request from 'App/Models/Request'

export const RequestFactory = Factory
  .define(Request, ({ faker }) => {
    return {
      total_price: faker.datatype.number()
    }
  })
  .build()

export const BuyerFactory = Factory
  .define(Buyer, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('requests', () => RequestFactory)
  .build()