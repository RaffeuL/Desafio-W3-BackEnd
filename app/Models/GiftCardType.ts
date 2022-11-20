import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import GiftCard from "./GiftCard";

export default class GiftCardType extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public type: string;

  @hasMany(() => GiftCard, { foreignKey: "gift_card_type_id" })
  public giftCards: HasMany<typeof GiftCard>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
