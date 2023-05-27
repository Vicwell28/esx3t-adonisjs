import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('user', 'UsersController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/UsersController")
  .middleware('auth')
