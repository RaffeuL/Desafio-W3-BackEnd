import Route from "@ioc:Adonis/Core/Route";

Route.post("login", "AuthController.login");
Route.get("logs", "LogsController.index");

Route.group(() => {
  Route.get("authenticated", "AuthController.authenticated");
}).middleware("auth:client");
