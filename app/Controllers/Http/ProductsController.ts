import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
    public async index({}: HttpContextContract) {
        const products = await Product.all()
        return products
      }

    public async show({ params }: HttpContextContract) {
        const product = await Product.findOrFail(params.product_id)
        return product
    }

    public async store({ request } : HttpContextContract) {
        const data = request.only(['name', 'category_id' , 'price'])
        const product = await Product.create(data)

        return product
    }

}
