import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Account from "App/Models/Account";
import Agency from "App/Models/Agency";
import Client from "App/Models/Client";
import Log from "App/Models/Log";
import OpenAccountValidator from "../validators/OpenAccountValidator";

export default class AccountsController {
  private generateAccountNumber() {
    var accountNumber = "";
    for (var i = 0; i <= 6; i++) {
      const number = Math.floor(Math.random() * 10);
      accountNumber += number.toString();
    }

    return accountNumber;
  }

  public async index({}: HttpContextContract) {
    const accounts = await Account.all();
    return accounts;
  }

  public async openAccount({ request, response }: HttpContextContract) {
    const validator = new OpenAccountValidator();

    await request.validate({
      schema: validator.schema,
      messages: {
        "password.regex":
          "Password must be a number and have 6 non repeated digits",
        "cpf.regex": "CPF must be a number and have 11 digits",
      },
    });
    const client = await Client.create(request.body());
    const agency_id = Math.floor(Math.random() * 10) + 1;
    const agency = await Agency.findOrFail(agency_id);

    const account = await Account.create({
      client_id: client.id,
      agency_id: agency.id,
      account_number: this.generateAccountNumber(),
      balance: 0,
    });

    await this.saveLog(client, account, agency);

    return response.created({
      message: `Agency Number: ${agency.agency_number}, Account Number: ${account.account_number}`,
    });
  }

  async saveLog(client: Client, account: Account, agency: Agency) {
    await Log.create({
      type: "open_account",
      description: `The client ${client.name} has opened an account with the number ${account.account_number} in agency ${agency.agency_number}`,
    });
  }
}
