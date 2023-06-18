import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('sale', 'SalesController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Sales")
  .middleware('auth')
