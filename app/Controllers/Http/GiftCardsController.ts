import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Account from "App/Models/Account";
import GiftCard from "App/Models/GiftCard";
import GiftCardType from "App/Models/GiftCardType";
import Log from "App/Models/Log";
import Transaction from "App/Models/Transaction";
import { DateTime } from "luxon";

export default class GiftCardTypesController {
  public async index({ response }: HttpContextContract) {
    const giftCardTypes = await GiftCardType.all();
    return response.send(giftCardTypes);
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ request, response }: HttpContextContract) {
    const type = request.input("type");

    const giftCardType = await GiftCardType.query().where("type", type).first();
    if (giftCardType) {
      giftCardType.load("giftCards");
      return response.send(giftCardType);
    } else {
      return response.notFound({ message: "Invalid Gift Card Type" });
    }
  }

  public async buyGiftCard({ request, response }: HttpContextContract) {
    const { agency_number, account_number, value, type, name } = request.only([
      "agency_number",
      "account_number",
      "value",
      "type",
      "name",
    ]);

    const account = await Account.query()
      .where("account_number", account_number)
      .first();
    if (account) {
      await account.load("agency");
      if (account.agency.agency_number != agency_number) {
        return response.unauthorized({ message: "Invalid agency" });
      }
      if (account.balance < value) {
        return response.unauthorized({ message: "Insufficient balance" });
      }
      const giftCardType = await GiftCardType.query()
        .where("type", type)
        .first();
      if (giftCardType) {
        const gitCard = await GiftCard.query().where("name", name).first();
        if (gitCard) {
          account.balance -= +value;
          await account.save();
          this.saveLog(value, account, type, name);
          return response.send({
            message: `Gift Card of type ${type} of ${name} of value ${value} bought successfully`,
          });
        } else {
          return response.notFound({ message: "Invalid Gift Card" });
        }
      } else {
        return response.notFound({ message: "Invalid Gift Card Type" });
      }
    }
  }

  async saveLog(
    value: string,
    account: Account,
    gift_card_type: string,
    gift_card_name: string
  ) {
    await Log.create({
      type: "gift card",
      description: `Gift Card of type ${gift_card_type} of ${gift_card_name} of value ${value}`,
    });
    await Transaction.create({
      account_id: account.id,
      type: "gift card",
      value: `-${value}`,
      date: DateTime.now(),
    });
  }
}
