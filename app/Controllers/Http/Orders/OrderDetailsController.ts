import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import OrderDetail from "App/Models/Orders/OrderDetail";
import OrderDetailCreateValidator from "App/Validators/Orders/OrderDetail/OrderDetailCreateValidator";
import OrderDetailUpdateValidator from "App/Validators/Orders/OrderDetail/OrderDetailUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class OrderDetailsController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy, order } = request.all() as {
        orderBy?: string;
        order?: string;
      };
     
      if (order) {
        let orderDetail = await OrderDetail.query()
        .preload('order')
        .preload('productBranch')
        .where("order_id", order).where("status", true)

        return response.ok({
          message: RETURN_DATA_OK,
          data: orderDetail,
        });
      }

      let orderDetail = await OrderDetail.all();

      if (orderBy === "des") {
        orderDetail = orderDetail.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: orderDetail,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(OrderDetailCreateValidator);

      const orderItems = payload.products.map((product) => ({
        order_id: payload.order_id,
        product_branche_id: product.product_branche_id,
        quantity: product.quantity,
      }));

      const status = await OrderDetail.createMany(orderItems);

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
      const orderDetail = await OrderDetail.findBy("id", id);

      if (!orderDetail) {
        return response.notFound({ error: "orderDetail not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: orderDetail,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(OrderDetailUpdateValidator);

      const id = request.param("id");

      (await OrderDetail.query().where("order_id", id)).forEach(
        async (product) => {
          await product.merge({ status: false }).save();
        }
      );

      const orderItems = payload.products.map((product) => ({
        order_id: payload.order_id,
        product_branche_id: product.product_branche_id,
        quantity: product.quantity,
      }));

      const status = await OrderDetail.createMany(orderItems);

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
      const orderDetail = await OrderDetail.findBy("id", id);

      if (!orderDetail) {
        return response.notFound({ error: "orderDetail not found" });
      }

      let userDeleted = await orderDetail
        .merge({ status: !orderDetail.status })
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
