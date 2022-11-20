import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import GiftCardType from "./GiftCardType";

export default class GiftCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public gift_card_type_id: number;

  @belongsTo(() => GiftCardType, { foreignKey: "gift_card_type_id" })
  public giftCardType: BelongsTo<typeof GiftCardType>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
