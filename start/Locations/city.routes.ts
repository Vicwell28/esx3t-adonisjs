import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('city', 'CitiesController')
 //.apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Locations")
  //.middleware('auth')
