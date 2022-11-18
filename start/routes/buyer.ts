import Route from '@ioc:Adonis/Core/Route'

Route.get('buyers', 'BuyersController.index')
Route.post('buyers', 'BuyersController.store')

Route.group(() => {
    Route.get('buyers/:buyer_id', 'BuyersController.show')

    Route.get('buyers/:buyer_id/requests/:request_id', 'RequestsController.show')
    
    Route.get('buyers/:buyer_id/requests/:request_id/chats/:chat_id', 'ChatsController.show')
    Route.get('buyers/:author_id/requests/:request_id/chats/:chat_id/messages/:message_id', 'MessagesController.show')
    
    Route.post('buyers/:buyer_id/requests/', 'RequestsController.store')
    Route.post('buyers/:author_id/requests/:request_id/chats/:chat_id/messages', 'MessagesController.store')
    
    Route.put('buyers/:buyer_id', 'BuyersController.update')
    
    Route.delete('buyers/:buyer_id', 'BuyersController.delete')
}).middleware('auth:buyer')