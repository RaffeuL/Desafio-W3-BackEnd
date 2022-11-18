import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Buyer from 'App/Models/Buyer'
import Courier from 'App/Models/Courier'
import Message from 'App/Models/Message'

export default class MessagesController {
  public async index({}: HttpContextContract) {
      
  }

  public async create({}: HttpContextContract) {}

  public async store({request, params}: HttpContextContract) {

    const data = request.only(['by_buyer', 'content'])
    
    const message = await Message.create({
      author_id: params.author_id,
      chat_id: params.chat_id,
      by_buyer: data.by_buyer,
      content: data.content,
    })

    return message

  }

  public async show({ params }: HttpContextContract) {
    
    const message = await Message.findOrFail(params.message_id)
    
    const message_author = message.by_buyer ? await Buyer.findOrFail(params.author_id) : await Courier.findOrFail(params.author_id)
    
    message.author = message_author

    return message
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
