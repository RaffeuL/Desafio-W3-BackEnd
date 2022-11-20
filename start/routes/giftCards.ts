import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("buyGiftCard", "GiftCardsController.buyGiftCard");
}).middleware("auth:client");
