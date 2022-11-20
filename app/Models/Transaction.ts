import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Account from "./Account";

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public type: string;

  @column()
  public value: string;

  @column()
  public account_id: number;

  @belongsTo(() => Account, { foreignKey: "account_id" })
  public account: BelongsTo<typeof Account>;

  @column.date({ serialize: (value) => value.toFormat("dd/MM/yyyy") })
  public date: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
