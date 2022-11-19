import Route from "@ioc:Adonis/Core/Route";

Route.get("clients", "ClientsController.index");
Route.post("clients", "ClientsController.store");
Route.post("accounts", "AccountsController.openAccount");
Route.get("accounts", "AccountsController.index");
