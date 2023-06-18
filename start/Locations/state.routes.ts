import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('state', 'StatesController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Locations")
  .middleware('auth')
