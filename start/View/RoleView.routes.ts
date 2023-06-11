import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.resource("RoleView", "RoleViewController").apiOnly();
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Views")
  .middleware("auth");
