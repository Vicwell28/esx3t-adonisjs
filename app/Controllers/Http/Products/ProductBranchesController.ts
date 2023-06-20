import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductBranches from "App/Models/Products/ProductBranches";
import ProductBranchesCreateValidator from "App/Validators/Products/ProductBranches/ProductBranchesCreateValidator";
import ProductBranchesUpdateValidator from "App/Validators/Products/ProductBranches/ProductBranchesUpdateValidator";


const RETURN_DATA_OK = "Return data ok";
export default class ProductCategoriesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let productBranches = await ProductBranches.all();

      if (orderBy === "des") {
        productBranches = productBranches.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: productBranches,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductBranchesCreateValidator);

      const status = await ProductBranches.create(payload);

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
      const productBranches = await ProductBranches.findBy("id", id);

      if (!productBranches) {
        return response.notFound({ error: "productBranches not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: productBranches,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductBranchesUpdateValidator);
      const id = request.param("id");

      const productBranches = await ProductBranches.findBy("id", id);

      if (!productBranches) {
        return response.notFound({ error: "productBranches not found" });
      }

      const status = await productBranches!.merge(payload).save();

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
      const productBranches = await ProductBranches.findBy("id", id);

      if (!productBranches) {
        return response.notFound({ error: "productBranches not found" });
      }

      let userDeleted = await productBranches
        .merge({ status: !productBranches.status })
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
