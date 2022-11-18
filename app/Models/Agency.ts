import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Account from "./Account";

export default class Agency extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public agency_number: number;

  @hasMany(() => Account, { foreignKey: "agency_id" })
  public accounts: HasMany<typeof Account>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
