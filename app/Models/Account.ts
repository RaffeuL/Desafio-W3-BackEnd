import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";
import Agency from "./Agency";

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public account_number: string;

  @column()
  public client_id: number;

  @column()
  public agency_id: number;

  @column()
  public balance: number;

  @belongsTo(() => Client, { foreignKey: "client_id" })
  public client: BelongsTo<typeof Client>;

  @belongsTo(() => Agency, { foreignKey: "agency_id" })
  public agency: BelongsTo<typeof Agency>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
