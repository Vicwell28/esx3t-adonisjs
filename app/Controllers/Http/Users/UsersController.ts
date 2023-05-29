import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/Users/User";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      // let users = await User.query().preload("role");

      const users = await User.query().preload('role', (query) => {
        query.select(['id', 'name', 'status']); 
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

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
