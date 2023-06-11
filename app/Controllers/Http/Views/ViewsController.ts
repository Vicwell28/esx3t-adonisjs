import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import View from "App/Models/Views/View";
import ViewCreateValidator from "App/Validators/Views/View/ViewCreateValidator";
import ViewUpdateValidator from "App/Validators/Views/View/ViewUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class ViewsController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let view = await View.query().preload("viewCategory");

      if (orderBy === "des") {
        view = view.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: view,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ViewCreateValidator);

      const status = await View.create(payload);

      return response.ok({
        message: RETURN_DATA_OK,
        data: status,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const view = await View.findBy("id", id);

      if (!view) {
        return response.notFound({ error: "view not found" });
      }

      await view.load("viewCategory");

      return response.ok({
        message: RETURN_DATA_OK,
        data: view,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ViewUpdateValidator);
      const id = request.param("id");

      const view = await View.findBy("id", id);

      if (!view) {
        return response.notFound({ error: "view not found" });
      }

      const status = await view!.merge(payload).save();

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
      const view = await View.findBy("id", id);

      if (!view) {
        return response.notFound({ error: "view not found" });
      }

      let userDeleted = await view.merge({ status: !view.status }).save();

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
