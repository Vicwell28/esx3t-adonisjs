import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthMiddleware {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      await auth.use("api").authenticate();

      if (auth.use("api").isAuthenticated) {
        await next();
      }
    } catch (error) {
      return response.unauthorized({
        error: {
          message: error
        },
      });
    }
  }
}
