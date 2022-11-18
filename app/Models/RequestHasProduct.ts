import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Request from './Request'
import Product from './Product'

export default class RequestHasProduct extends BaseModel {
  @column()
  public request_id: number

  @column()
  public product_id: number

  @belongsTo(() => Request)
  public request: BelongsTo<typeof Request>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
