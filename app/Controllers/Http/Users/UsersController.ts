import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/Users/User";
import UserUpdateValidator from "App/Validators/User/UserUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class UsersController {
  public async index({ response, request, auth }: HttpContextContract) {
    try {
      
      const { isAuth } = request.all() as { isAuth?: string };

      let users: any; 

      if (isAuth != null && isAuth == "true")
      {
        users = await User.query()
        .where('id', auth.user!.id)
        .preload("role")
        .preload("branch")
        .preload("city")
        .firstOrFail();
      } else {
        users = await User.query()
        .preload("role")
        .preload("branch")
        .preload("city");
      }


     

      return response.ok({
        message: "all uses",
        users: users,
      });
    } catch (error) {
      return response.badRequest({
        error: {
          message: error,
        },
      });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const user = await User.findBy("id", id);

      if (!user) {
        return response.notFound({ error: "user not found" });
      }

      await user.load("branch");

      await user.load("city");

      await user.load("role");

      return response.ok({
        message: RETURN_DATA_OK,
        data: user,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UserUpdateValidator);

      const user = await User.create(payload);

      if (!user) {
        return response.notFound({ error: "user not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: user,
      });
    } catch (e) {
      console.log(e)
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UserUpdateValidator);
      const id = request.param("id");

      const user = await User.findBy("id", id);

      if (!user) {
        return response.notFound({ error: "user not found" });
      }

      const status = await user!.merge(payload).save();

      await status.load("branch");

      await status.load("city");

      await status.load("role");

      return response.ok({
        message: RETURN_DATA_OK,
        data: status,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
  public async destroy({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const user = await User.findBy("id", id);

      if (!user) {
        return response.notFound({ error: "user not found" });
      }

      let userDeleted = await user.merge({ status: !user.status }).save();

      await userDeleted.load("branch");

      await userDeleted.load("city");

      await userDeleted.load("role");

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

}
