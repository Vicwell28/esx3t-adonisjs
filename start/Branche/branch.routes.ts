import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
 Route.resource('branch', 'BranchesController').apiOnly()
})
  .prefix("api/v1/")
  .namespace("App/Controllers/Http/Branches")
  .middleware('auth')
