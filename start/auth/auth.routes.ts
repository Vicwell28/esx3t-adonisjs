import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("sign-in", "AuthController.signIn");

  Route.post("sign-up", "AuthController.signUp");

  Route.post("forgot-password", "AuthController.forgotPassword");

  Route.post("logout", "AuthController.logout").middleware('auth')
})
  .prefix("api/v1/auth")
  .namespace("App/Controllers/Http/AuthController");
