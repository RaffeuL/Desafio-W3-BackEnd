import Route from '@ioc:Adonis/Core/Route'

Route.get('couriers', 'CouriersController.index')
Route.post('couriers', 'CouriersController.store')

Route.group(() => {
    Route.get('couriers/findRequests', 'RequestsController.findRequests')
    Route.get('couriers/:courier_id', 'CouriersController.show')
    Route.get('couriers/:courier_id/requests/:request_id', 'RequestsController.show')

    Route.get('couriers/:courier_id/requests/:request_id/chats/:chat_id', 'ChatsController.show')
    Route.get('couriers/:author_id/requests/:request_id/chats/:chat_id/messages/:message_id', 'MessagesController.show')
    
    Route.post('couriers/:author_id/requests/:request_id/chats/:chat_id/messages', 'MessagesController.store')
    
    Route.put('couriers/:courier_id', 'CouriersController.update')
    Route.put('couriers/:courier_id/requests/:request_id', 'RequestsController.accetpByCourier')
    Route.put('couriers/:courier_id/requests/:request_id/updateStatus', 'RequestsController.updateStatus')
    
    Route.delete('couriers/:courier_id', 'CouriersController.delete')
}).middleware('auth:courier')