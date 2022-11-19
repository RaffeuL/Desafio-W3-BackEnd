import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";

export default class ClientsController {
  public async index({}: HttpContextContract) {
    const client = await Client.all();

    return client;
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only([
      "name",
      "email",
      "password",
      "cpf",
      "birht_date",
    ]);
    const client = await Client.create(data);

    return client;
  }

  public async show({ params }: HttpContextContract) {
    const client = await Client.findOrFail(params.buyer_id);
    return client;
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const client = await Client.findOrFail(params.Client_id);
    const data = request.body();
    client.merge(data);

    await client.save();

    return client;
  }

  public async destroy({ params }: HttpContextContract) {
    const client = await Client.findOrFail(params.client_id);
    await client.delete();

    return "Sucess";
  }
}
