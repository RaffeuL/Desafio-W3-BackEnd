import Route from "@ioc:Adonis/Core/Route";

Route.post("deposit", "AccountsController.deposit");
Route.post("withdraw", "AccountsController.withdraw");

Route.group(() => {
  Route.post("consultBalance", "AccountsController.consultBalance");
  Route.post("consultTransactions", "AccountsController.consultTransactions");
}).middleware("auth:client");
