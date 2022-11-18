import Route from '@ioc:Adonis/Core/Route';

Route.get('products' , 'ProductsController.index')
Route.get('products/:product_id' , 'ProductsController.show')