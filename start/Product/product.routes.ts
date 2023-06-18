import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('product', 'ProductsController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Products")
  .middleware('auth')
