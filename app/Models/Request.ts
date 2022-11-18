import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
// import RequestHasProduct from './RequestHasProduct'
import Chat from './Chat'
import Buyer from './Buyer'
import Courier from './Courier'
//import Product from './Product'

export default class Request extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public buyer_id: number

  @column()
  public courier_id: number

  @column()
  public buyer_name: string

  @column()
  public courier_name: string

  @column()
  public status: number 

  @column()
  public products: string

  @column()
  public description: string

  @column()
  public observation: string

  @belongsTo(() => Buyer)
  public buyer: BelongsTo<typeof Buyer>

  @belongsTo(() => Courier)
  public courier: BelongsTo<typeof Courier>

  // @manyToMany(() => Product, {pivotTable: 'request_has_products'})
  // public products: ManyToMany<typeof Product>

  @hasOne(() => Chat, {foreignKey: 'request_id'})
  public chat: HasOne<typeof Chat>

  @column()
  public total_price: number

  @column()
  public delivery_place: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
