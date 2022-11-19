import { DateTime } from "luxon";
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Account from "./Account";
import Hash from "@ioc:Adonis/Core/Hash";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @beforeSave()
  public static async hashPassword(client: Client) {
    if (client.$dirty.password) {
      client.password = await Hash.make(client.password);
    }
  }

  @column()
  public birth_date: DateTime;

  @hasMany(() => Account, { foreignKey: "client_id" })
  public accounts: HasMany<typeof Account>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
