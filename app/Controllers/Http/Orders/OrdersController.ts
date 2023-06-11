import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Order from "App/Models/Orders/Order";
import OrderCreateValidator from "App/Validators/Orders/Order/OrderCreateValidator";
import OrderUpdateValidator from "App/Validators/Orders/Order/OrderUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class OrdersController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let order = await Order.all();

      if (orderBy === "des") {
        order = order.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: order,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(OrderCreateValidator);

    //   const status = await Order.create(payload);

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
      const order = await Order.findBy("id", id);

      if (!order) {
        return response.notFound({ error: "order not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: order,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(OrderUpdateValidator);
      const id = request.param("id");

      const order = await Order.findBy("id", id);

      if (!order) {
        return response.notFound({ error: "order not found" });
      }

    //   const status = await order!.merge(payload).save();

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
      const order = await Order.findBy("id", id);

      if (!order) {
        return response.notFound({ error: "order not found" });
      }

      let userDeleted = await order.merge({ status: !order.status }).save();

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
