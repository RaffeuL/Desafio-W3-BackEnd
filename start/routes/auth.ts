import Route from '@ioc:Adonis/Core/Route'

Route.post('buyer_login', 'AuthController.buyerLogin')
Route.post('courier_login', 'AuthController.courierLogin')

Route.post('logout', 'AuthController.logout').middleware('auth:buyer,courier')


Route.get('authenticated', 'AuthController.authenticated').middleware('auth:buyer,courier')