import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('product/branche', 'ProductBranchesController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Products")
  .middleware('auth')
