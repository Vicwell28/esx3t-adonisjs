import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import ForgotPasswordValidator from "App/Validators/auth/ForgotPasswordValidator";
import SignInValidator from "App/Validators/auth/SignInValidator";
import SignUpValidator from "App/Validators/auth/SignUpValidator";

export default class AuthController {
  public async signIn({ request, response, auth }: HttpContextContract) {
    try {
      const cred = await request.validate(SignInValidator);

      if (!cred) {
        return response.badRequest({
          error: {
            message: "Invalid credentials",
          },
        });
      }

      const user = await User.findBy("email", cred.email);

      if (!user) {
        return response.badRequest({
          error: {
            message: "user not found ",
          },
        });
      }

      const token = await auth.use("api").attempt(cred.email, cred.password);

      if (!token) {
        return response.unauthorized({
          error: {
            message: "Invalid credentials",
          },
        });
      }

      return response.ok({
        message: "",
        user,
        token,
      });
    } catch (error) {
      return response.badRequest({
        error: {
          message: error,
        },
      });
    }
  }

  public async signUp({ request, response, auth }: HttpContextContract) {
    try {
      const preload = await request.validate(SignUpValidator);

      if (!preload) {
        return response.badRequest({
          error: {
            message: "user not found ",
          },
        });
      }

      const user = await User.create(preload);

      if (!user) {
        return response.badRequest({
          error: {
            message: "user error ",
          },
        });
      }

      const token = await auth.use("api").attempt(user.email, preload.password);

      return response.ok({
        message: "User create sseudfuloi",
        user,
        token,
      });
    } catch (error) {
      return response.badRequest({
        error: {
          message: error,
        },
      });
    }
  }

  public async forgotPassword({ request, response }: HttpContextContract) {
    try {
      const user = await request.validate(ForgotPasswordValidator);

      return response.ok({
        message: "Se envio el correo",
        user: user,
      });
    } catch (error) {
      return response.badRequest({
        error: {
          message: error,
        },
      });
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use("api").revoke();

      return response.ok({
        message: "logout ok",
      });
    } catch (error) {
      return response.badRequest({
        error: {
          message: error,
        },
      });
    }
  }
}
