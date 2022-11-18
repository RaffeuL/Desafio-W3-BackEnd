import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Account from "./Account";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public birht_date: DateTime;

  @hasMany(() => Account, { foreignKey: "client_id" })
  public accounts: HasMany<typeof Account>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
