import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Sale from "App/Models/Sales/Sale";
import SalesCreateValidator from "App/Validators/Sales/Sales/SalesCreateValidator";
import SalesUpdateValidator from "App/Validators/Sales/Sales/SalesUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class SalesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let sale = await Sale.query()
      .preload('client')
      .preload('employee');

      if (orderBy === "des") {
        sale = sale.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: sale,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(SalesCreateValidator);

      const status = await Sale.create(payload);

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
      const sale = await Sale.findBy("id", id);

      if (!sale) {
        return response.notFound({ error: "sale not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: sale,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(SalesUpdateValidator);
      const id = request.param("id");

      const sale = await Sale.findBy("id", id);

      if (!sale) {
        return response.notFound({ error: "sale not found" });
      }

      const status = await sale!.merge(payload).save();

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
      const sale = await Sale.findBy("id", id);

      if (!sale) {
        return response.notFound({ error: "sale not found" });
      }

      let userDeleted = await sale.merge({ status: !sale.status }).save();

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
