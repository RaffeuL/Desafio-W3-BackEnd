import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Buyer from 'App/Models/Buyer'

export default class BuyersController {
  public async index({}: HttpContextContract) {
    const buyers = await Buyer.all()
    
    return buyers
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])
    const buyer = await Buyer.create(data)

    return buyer
  }

  public async show({ params }: HttpContextContract) {
    const buyer = await Buyer.findOrFail(params.buyer_id)
    await buyer.load('requests')
    return buyer
  }

  public async edit({}: HttpContextContract) {}

  private validationOptions = { type: ['image', 'pdf'], size: '2mb', ext: ['jpg', 'png', 'jpeg'] }

  public async update({ request, params }: HttpContextContract) {
    const buyer = await Buyer.findOrFail(params.buyer_id)
    const data = request.body()

    if(buyer.photo != data.photo || !buyer.photo) {
      if(buyer.photo) { await Drive.delete(buyer.photo) }
      
      const photo = request.file('photo', this.validationOptions)
      if(photo) {
        await photo.moveToDisk('./')
        const fileName = photo.fileName
  
        data.photo = fileName
      }
    } 
    
    buyer.merge(data)
    await buyer.save()

    return buyer
  }

  public async destroy({ params }: HttpContextContract) {
    const buyer = await Buyer.findOrFail(params.buyer_id)

    if(buyer.photo){
      await Drive.delete(buyer.photo)
    }
    await buyer.delete()
    
    return 'Sucess'
  }
  
}
