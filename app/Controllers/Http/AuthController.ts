import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Buyer from 'App/Models/Buyer'
import Hash from '@ioc:Adonis/Core/Hash'
import Courier from 'App/Models/Courier'

export default class AuthController {
    public async buyerLogin({ request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
    
        const buyer = await Buyer
          .query()
          .where('email', email)
          .first()
    
        if (buyer){
          if (!(await Hash.verify(buyer.password, password))) {
            return response.unauthorized('Senha incorreta')
          }
    
          const token = await auth.use('buyer').generate(buyer, {
            expiresIn: '7 days'
          })
          return token
    
        }else{
          return response.notFound('Comprador não encontrado')
        }
      }

      public async courierLogin({ request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
    
        const courier = await Courier
          .query()
          .where('email', email)
          .first()
    
        if (courier){
          if (!(await Hash.verify(courier.password, password))) {
            return response.unauthorized('Senha incorreta')
          }
    
          const token = await auth.use('courier').generate(courier, {
            expiresIn: '7 days'
          })
          return token
    
        }else{
          return response.notFound('Comprador não encontrado')
        }
      }


      public async authenticated({ auth, response }: HttpContextContract){
        if(auth.use().user instanceof Buyer){
            const buyer = await Buyer.findOrFail(auth.user?.$getAttribute('id'))
            response.send(buyer)
        }else {
            const courier = await Courier.findOrFail(auth.user?.$getAttribute('id'))
            response.send(courier)
        }
      }

      public async logout({auth, response} :HttpContextContract){
        if(auth.use().user instanceof Buyer){ await auth.use('buyer').revoke() }
        else { await auth.use('courier').revoke() }
        
        response.send('Logout')
      }

}
