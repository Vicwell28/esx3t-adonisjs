import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Role from "App/Models/Users/Role";

const RETURN_DATA_OK = "Return data ok";
export default class RolesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let role = await Role.all();

      if (orderBy === "des") {
        role = role.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: role,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      //   const payload = await request.validate(RoleCreateValidator);

      //   const status = await Role.create(payload);

      return response.ok({
        message: RETURN_DATA_OK,
        // data: status,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const role = await Role.findBy("id", id);

      if (!role) {
        return response.notFound({ error: "role not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: role,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      //   const payload = await request.validate(RoleUpdateValidator);
      //   const id = request.param("id");

      //   const role = await Role.findBy("id", id);

      //   if (!role) {
      //     return response.notFound({ error: "role not found" });
      //   }

      //   const status = await role!.merge(payload).save();

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
      const role = await Role.findBy("id", id);

      if (!role) {
        return response.notFound({ error: "role not found" });
      }

      let userDeleted = await role.merge({ status: !role.status }).save();

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
