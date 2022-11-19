import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";
import Hash from "@ioc:Adonis/Core/Hash";
import Account from "App/Models/Account";

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const account_number = request.input("account_number");
    const agency_number = request.input("agency_number");
    const password = request.input("password");

    const account = await Account.query()
      .where("account_number", account_number)
      .first();

    if (account) {
      await account.load("client");
      await account.load("agency");
      if (!(await Hash.verify(account.client.password, password))) {
        return response.unauthorized({ message: "Invalid password" });
      }
      if (account.agency.agency_number != agency_number) {
        return response.unauthorized({ message: "Invalid agency" });
      }

      const token = await auth.use("client").generate(account.client, {
        expiresIn: "7 days",
      });
      return token;
    } else {
      return response.notFound({ message: "Invalid Account" });
    }
  }

  public async authenticated({ auth, response }: HttpContextContract) {
    if (auth.use().user instanceof Client) {
      const client = await Client.findOrFail(auth.user?.$getAttribute("id"));
      const account = await Account.query()
        .where("client_id", client.id)
        .preload("agency")
        .preload("client")
        .first();
      response.send(account);
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    if (auth.use().user instanceof Client) {
      await auth.use("client").revoke();
    } else {
      await auth.use("client").revoke();
    }

    response.send("Logout");
  }
}
