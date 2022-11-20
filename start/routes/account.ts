import Route from "@ioc:Adonis/Core/Route";

Route.post("openAccount", "AccountsController.openAccount");
Route.post("deposit", "AccountsController.deposit");
Route.post("withdraw", "AccountsController.withdraw");

Route.group(() => {
  Route.post("consultBalance", "AccountsController.consultBalance");
  Route.post("consultTransactions", "AccountsController.consultTransactions");
  Route.post("transference", "AccountsController.transference");
}).middleware("auth:client");
