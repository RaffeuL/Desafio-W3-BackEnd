import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("consultBalance", "AccountsController.consultBalance");
}).middleware("auth:client");
