import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductCategory from "App/Models/Products/ProductCategory";
import ProductCategoryCreateValidator from "App/Validators/Products/ProductCategory/ProductCategoryCreateValidator";
import ProductCategoryUpdateValidator from "App/Validators/Products/ProductCategory/ProductCategoryUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class ProductCategoriesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let productCategory = await ProductCategory.all();

      if (orderBy === "des") {
        productCategory = productCategory.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: productCategory,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductCategoryCreateValidator);

      const status = await ProductCategory.create(payload);

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
      const productCategory = await ProductCategory.findBy("id", id);

      if (!productCategory) {
        return response.notFound({ error: "productCategory not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: productCategory,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductCategoryUpdateValidator);
      const id = request.param("id");

      const productCategory = await ProductCategory.findBy("id", id);

      if (!productCategory) {
        return response.notFound({ error: "productCategory not found" });
      }

      const status = await productCategory!.merge(payload).save();

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
      const productCategory = await ProductCategory.findBy("id", id);

      if (!productCategory) {
        return response.notFound({ error: "productCategory not found" });
      }

      let userDeleted = await productCategory
        .merge({ status: !productCategory.status })
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
