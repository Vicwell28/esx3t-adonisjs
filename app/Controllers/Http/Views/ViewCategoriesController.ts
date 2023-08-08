import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ViewCategory from "App/Models/Views/ViewCategory";
import ViewCategoryCreateValidator from "App/Validators/Views/ViewCategory/ViewCategoryCreateValidator";
import ViewCategoryUpdateValidator from "App/Validators/Views/ViewCategory/ViewCategoryUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class ViewCategoriesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let viewCategory = await ViewCategory.query().orderBy('id').preload("view")

      if (orderBy === "des") {
        viewCategory = viewCategory.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: viewCategory,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ViewCategoryCreateValidator);

      const status = await ViewCategory.create(payload);

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
      const viewCategory = await ViewCategory.findBy("id", id);

      if (!viewCategory) {
        return response.notFound({ error: "viewCategory not found" });
      }

      await viewCategory.load("view");

      return response.ok({
        message: RETURN_DATA_OK,
        data: viewCategory,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ViewCategoryUpdateValidator);
      const id = request.param("id");

      const viewCategory = await ViewCategory.findBy("id", id);

      if (!viewCategory) {
        return response.notFound({ error: "viewCategory not found" });
      }

      const status = await viewCategory!.merge(payload).save();

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
      const viewCategory = await ViewCategory.findBy("id", id);

      if (!viewCategory) {
        return response.notFound({ error: "viewCategory not found" });
      }

      let userDeleted = await viewCategory
        .merge({ status: !viewCategory.status })
        .save();

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
