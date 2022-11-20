import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Account from "App/Models/Account";
import Agency from "App/Models/Agency";
import Client from "App/Models/Client";
import Log from "App/Models/Log";
import Transaction from "App/Models/Transaction";
import { DateTime } from "luxon";
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

    await this.saveAccountLog(client, account, agency);

    return response.created({
      message: `Agency Number: ${agency.agency_number}, Account Number: ${account.account_number}`,
    });
  }

  async saveAccountLog(client: Client, account: Account, agency: Agency) {
    await Log.create({
      type: "open_account",
      description: `The client ${client.name} has opened an account with the number ${account.account_number} in agency ${agency.agency_number}`,
    });
  }

  public async consultBalance({ request, response }: HttpContextContract) {
    const account_number = request.input("account_number");
    const agency_number = request.input("agency_number");

    const account = await Account.query()
      .where("account_number", account_number)
      .first();

    if (account) {
      await account.load("agency");
      if (account.agency.agency_number != agency_number) {
        return response.unauthorized({ message: "Invalid agency" });
      }
      return response.send({ balance: account.balance });
    } else {
      return response.notFound({ message: "Invalid Account" });
    }
  }

  public async consultTransactions({ request, response }: HttpContextContract) {
    const account_number = request.input("account_number");
    const agency_number = request.input("agency_number");

    const account = await Account.query()
      .where("account_number", account_number)
      .first();

    if (account) {
      await account.load("agency");
      if (account.agency.agency_number != agency_number) {
        return response.unauthorized({ message: "Invalid agency" });
      }
      await account.load("transactions");
      return response.send({ transactions: account.transactions });
    } else {
      return response.notFound({ message: "Invalid Account" });
    }
  }

  public async transference({ request, response }: HttpContextContract) {
    const {
      account_number,
      agency_number,
      value,
      destination_account_number,
      destination_agency_number,
    } = request.only([
      "account_number",
      "agency_number",
      "value",
      "destination_account_number",
      "destination_agency_number",
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
      const destinationAccount = await Account.query()
        .where("account_number", destination_account_number)
        .first();
      if (destinationAccount) {
        await destinationAccount.load("agency");
        if (
          destinationAccount.agency.agency_number != destination_agency_number
        ) {
          return response.unauthorized({ message: "Invalid agency" });
        }
        account.balance -= +value;
        await account.save();
        destinationAccount.balance += +value;
        await destinationAccount.save();
        this.saveTransactionLog("transference", `-${value}`, account);
        this.saveTransactionLog(
          "transference",
          `+${value}`,
          destinationAccount
        );
        response.send({
          transference: `The value ${value} was transference from account ${account_number} to account ${destination_account_number}`,
        });
      } else {
        response.notFound({ message: "Invalid Account" });
      }
    }
  }

  public async deposit({ request, response }: HttpContextContract) {
    const account_number = request.input("account_number");
    const agency_number = request.input("agency_number");
    const value: number = request.input("value");

    const account = await Account.query()
      .where("account_number", account_number)
      .first();

    if (account) {
      await account.load("agency");
      if (account.agency.agency_number != agency_number) {
        return response.unauthorized({ message: "Invalid agency" });
      }
      account.balance += +value;
      await account.save();
      this.saveTransactionLog("deposit", `+${value}`, account);
      return response.send({ balance: account.balance });
    } else {
      return response.notFound({ message: "Invalid Account" });
    }
  }

  public async withdraw({ request, response }: HttpContextContract) {
    const account_number = request.input("account_number");
    const agency_number = request.input("agency_number");
    const value = request.input("value");

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
      account.balance -= +value;
      await account.save();
      this.saveTransactionLog("withdraw", `-${value}`, account);
      return response.send({ balance: account.balance });
    } else {
      return response.notFound({ message: "Invalid Account" });
    }
  }

  async saveTransactionLog(type: string, value: string, account: Account) {
    await Transaction.create({
      account_id: account.id,
      type: type,
      value: value,
      date: DateTime.now(),
    });

    await Log.create({
      type: "transaction",
      description: `A transaction of type ${type} with value ${value} has been made by the account ${account.account_number}`,
    });
  }
}
