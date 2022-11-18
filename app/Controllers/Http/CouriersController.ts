import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Courier from 'App/Models/Courier'
import Drive from '@ioc:Adonis/Core/Drive'

export default class CouriersController {
  public async index({}: HttpContextContract) {
    const couriers = await Courier.all()
    
    return couriers
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])
    const courier = await Courier.create(data)

    return courier
  }

  public async show({ params }: HttpContextContract) {
    const courier = await Courier.findOrFail(params.courier_id)
    await courier.load('requests')
    return courier
  }

  public async edit({}: HttpContextContract) {}

  private validationOptions = { type: ['image', 'pdf'], size: '2mb', ext: ['jpg', 'png', 'jpeg'] }

  public async update({ request, params }: HttpContextContract) {
    const courier = await Courier.findOrFail(params.courier_id)
    const data = request.body()

    if(courier.photo != data.photo || !courier.photo) {
      if(courier.photo) { await Drive.delete(courier.photo) }
      
      const photo = request.file('photo', this.validationOptions)
      if(photo) {
        await photo.moveToDisk('./')
        const fileName = photo.fileName
  
        data.photo = fileName
      }
    } 
    
    courier.merge(data)
    await courier.save()

    return courier
  }

  public async destroy({ params }: HttpContextContract) {
    const courier = await Courier.findOrFail(params.id)

    await courier.delete()
  }
  
}
