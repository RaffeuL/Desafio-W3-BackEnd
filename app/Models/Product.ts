import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column  } from '@ioc:Adonis/Lucid/Orm'

import Category from './Category'
//import Request from './Request'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public name: string

  @column()
  public photo: string
  
  @column()
  public price: number

  // @manyToMany(() => Request, {pivotTable: 'request_has_products'})
  // public requests: ManyToMany<typeof Request>
  
  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
