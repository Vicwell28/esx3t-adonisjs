import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/Users/User";

const RETURN_DATA_OK = "Return data ok";
export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.query().preload("role", (query) => {
        query.select(["id", "name", "status"]);
      });

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

      return response.ok({
        message: RETURN_DATA_OK,
        data: user,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      // const payload = await request.validate(UserUpdateValidator);
      // const id = request.param("id");

      // const user = await User.findBy("id", id);

      // if (!user) {
      //   return response.notFound({ error: "user not found" });
      // }

      // const status = await user!.merge(payload).save();

      return response.ok({
        message: RETURN_DATA_OK,
        // data: status,
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

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
