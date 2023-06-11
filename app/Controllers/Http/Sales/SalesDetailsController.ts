import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SalesDetail from "App/Models/Sales/SalesDetail";
import SalesDetailCreateValidator from "App/Validators/Sales/SalesDetail/SalesDetailCreateValidator";
import SalesDetailUpdateValidator from "App/Validators/Sales/SalesDetail/SalesDetailUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class SalesDetailsController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let salesDetail = await SalesDetail.all();

      if (orderBy === "des") {
        salesDetail = salesDetail.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: salesDetail,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(SalesDetailCreateValidator);

      // const status = await SalesDetail.create(payload);

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
      const salesDetail = await SalesDetail.findBy("id", id);

      if (!salesDetail) {
        return response.notFound({ error: "salesDetail not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: salesDetail,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(SalesDetailUpdateValidator);
      const id = request.param("id");

      const salesDetail = await SalesDetail.findBy("id", id);

      if (!salesDetail) {
        return response.notFound({ error: "salesDetail not found" });
      }

      // const status = await salesDetail!.merge(payload).save();

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
      const salesDetail = await SalesDetail.findBy("id", id);

      if (!salesDetail) {
        return response.notFound({ error: "salesDetail not found" });
      }

      let userDeleted = await salesDetail
        .merge({ status: !salesDetail.status })
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
