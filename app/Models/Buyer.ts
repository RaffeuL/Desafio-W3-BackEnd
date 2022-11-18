import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Request from './Request'

export default class Buyer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(buyer: Buyer) {
    if(buyer.$dirty.password) {
      buyer.password = await Hash.make(buyer.password)
    }
  }

  @column()
  public photo: string

  @hasMany(() => Request, {foreignKey: 'buyer_id'})
  public requests: HasMany<typeof Request>

  @column()
  public rating: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
