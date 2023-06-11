import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/Users/User";
import ForgotPasswordValidator from "App/Validators/Auth/ForgotPasswordValidator";
import SignInValidator from "App/Validators/Auth/SignInValidator";
import SignUpValidator from "App/Validators/Auth/SignUpValidator";
import Mail from "@ioc:Adonis/Addons/Mail";

export default class AuthController {
  //ESTA ES LA FUNCION SHUFFLE

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  public async signIn({ request, response, auth }: HttpContextContract) {
    try {
      const cred = await request.validate(SignInValidator);
      const user = await User.findBy("email", cred.email);

      if (!cred || !user) {
        return response.badRequest({
          error: {
            message: "Invalid credentials or user not found",
          },
        });
      }

      const token = await auth.use("api").attempt(cred.email, cred.password);

      const role = await user.load("role", (query) => {
        query.select(["id", "name", "status"]);
      });

      return response.ok({
        message: "successfully logged in",
        user,
        token,
        role,
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
      const { username, email, password } = preload;
      const data = {
        role_id: 3,
        username,
        password,
        email,
      };

      const user = await User.create(data);

      if (!user) {
        return response.badRequest({
          error: {
            message: "Failed to create user",
          },
        });
      }

      const token = await auth.use("api").attempt(email, password);
      const role = await user.load("role", (query) => {
        query.select(["id", "name", "status"]);
      });

      return response.ok({
        message: "User created successfully",
        user,
        token,
        role,
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
      const preload = await request.validate(ForgotPasswordValidator);
      const user = await User.findByOrFail("email", preload.email);

      if (!user) {
        return response.badRequest({
          error: {
            message: "User not found",
          },
        });
      }

      const nums = this.shuffleArray("123456789".split(""))
        .slice(0, 5)
        .join("");
      const letters = this.shuffleArray("qwertyuiopasdfghjklñzxcvbnm".split(""))
        .slice(0, 5)
        .join("");
      const sin = this.shuffleArray("!#$%&/()=?¡¨*[]_:;+{}.-,".split(""))
        .slice(0, 5)
        .join("");
      const newPassword = this.shuffleArray(`${nums}${letters}${sin}`.split(""))
        .slice(0, 10)
        .join("");
      const userP = await user.merge({ password: newPassword }).save();

      await Mail.send((message) => {
        message
          .from("vicwell.bj@gmail.com")
          .to(user.email)
          .subject("Nueva contraseña")
          .text("¡Hola!\nEsta es tu nueva contraseña: " + newPassword);
      });

      return response.ok({
        message: "Se envió el correo",
        userP,
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
        message: "Logout successful",
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
