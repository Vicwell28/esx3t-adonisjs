import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Products/Product";
import ProductCreateValidator from "App/Validators/Products/Product/ProductCreateValidator";
import ProductUpdateValidator from "App/Validators/Products/Product/ProductUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class ProductsController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let product = await Product
      .query()
      .preload("productCategory")

      if (orderBy === "des") {
        product = product.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: product,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductCreateValidator);

      const status = await Product.create(payload);

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
      const product = await Product.findBy("id", id);

      if (!product) {
        return response.notFound({ error: "product not found" });
      }

      await product.load("productCategory")

      return response.ok({
        message: RETURN_DATA_OK,
        data: product,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductUpdateValidator);
      const id = request.param("id");

      const product = await Product.findBy("id", id);

      if (!product) {
        return response.notFound({ error: "product not found" });
      }

      const status = await product!.merge(payload).save();

      await status.load("productCategory")

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
      const product = await Product.findBy("id", id);

      if (!product) {
        return response.notFound({ error: "product not found" });
      }

      let userDeleted = await product.merge({ status: !product.status }).save();

      await userDeleted.load("productCategory")

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
