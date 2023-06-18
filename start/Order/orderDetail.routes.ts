import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('order/detail', 'OrderDetailsController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Orders")
  .middleware('auth')
