import Route from '@ioc:Adonis/Core/Route';

Route.get('categories', 'CategoriesController.index')
Route.get('categories/:category_id', 'CategoriesController.show')
Route.post('categories', 'CategoriesController.store')
Route.post('categories/:category_id/products', 'ProductsController.store')