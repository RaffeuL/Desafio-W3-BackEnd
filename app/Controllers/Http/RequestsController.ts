import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Chat from 'App/Models/Chat';
import Courier from 'App/Models/Courier';
//import Product from 'App/Models/Product';
import Request from 'App/Models/Request';

export default class RequestsController {
  public async index({}: HttpContextContract) {
    const requests = await Request.all()

    return requests
  }

  public async findRequests({}: HttpContextContract) {
    const requests = await Request.query().whereNull('courier_id')
    return requests
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.body()
    const buyer_request = await Request.create(data)
    await Chat.create({request_id: buyer_request.id})

    buyer_request.save()
    await buyer_request.load('chat')

    return buyer_request
  }


  public async show({ params }: HttpContextContract) {
    const request = await Request.findOrFail(params.request_id)
    
    await request.load('chat')

    return request
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {
    
  }

  public async accetpByCourier({ params }: HttpContextContract){
    const courier_request = await Request.findOrFail(params.request_id)
    const courier = await Courier.findOrFail(params.courier_id)
    
    if(!courier_request.courier_id) {
      courier_request.courier_name = courier.name
      courier_request.courier_id = params.courier_id
      await courier_request.save()
      return courier_request
    }

    return 'Fail'
  }

  public async updateStatus({ params, request } :HttpContextContract) {
    const request_ = await Request.findOrFail(params.request_id)
    const status = request.input('status')
    if(request_.status > 4 || status > 4) { return request_ }

    request_.status = status
    request_.save()

    return request_
  }


  public async destroy({ params }: HttpContextContract) {
    const request_ = await Request.findOrFail(params.request_id)

    await request_.delete()

    return "Sucess"
  }
}
