import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'
import Buyer from './Buyer'
import Courier from './Courier'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public author_id: number

  @column()
  public chat_id: number

  @belongsTo(() => Chat)
  public chat: BelongsTo<typeof Chat>

  @column()
  public by_buyer: boolean
  
  @computed()
  public author: Buyer | Courier

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
