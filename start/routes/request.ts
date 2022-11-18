import Route from '@ioc:Adonis/Core/Route'

Route.get('requests', 'RequestsController.index')
Route.get('requests/:request_id', 'RequestsController.show')
Route.delete('requests/:request_id', 'RequestsController.destroy')