import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('role', 'RolesController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Users")
  .middleware('auth')
