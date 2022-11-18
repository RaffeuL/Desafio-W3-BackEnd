import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = Category.all()

    return categories
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name'])
    const category = await Category.create(data)

    return category;

  }

  public async show({params}: HttpContextContract) {
    const category = await Category.findOrFail(params.category_id)
    await category.load('products')
    return category;

  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
