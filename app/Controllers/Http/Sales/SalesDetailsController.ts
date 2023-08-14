import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductBranches from "App/Models/Products/ProductBranches";
import SalesDetail from "App/Models/Sales/SalesDetail";
import SalesDetailCreateValidator from "App/Validators/Sales/SalesDetail/SalesDetailCreateValidator";
import SalesDetailUpdateValidator from "App/Validators/Sales/SalesDetail/SalesDetailUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class SalesDetailsController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy, sale_id } = request.all() as {
        orderBy?: string;
        sale_id?: string;
      };

      if (sale_id) {
        let orderDetail = await SalesDetail.query()
          .where("sale_id", sale_id)
          .where("status", true)
          .preload("sale", (sale) => {
            sale.preload("client");
          });

        return response.ok({
          message: RETURN_DATA_OK,
          data: orderDetail,
        });
      }

      let salesDetail = await SalesDetail.query()
        .preload("sale", (sale) => {
          sale.preload("client");
        })
        .preload("productBranch", (pb) => {
          pb.preload("product");
        });

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

      const orderItems = payload.products.map((product) => ({
        sale_id: payload.sale_id,
        product_branche_id: product.product_branche_id,
        quantity: product.quantity,
      }));

      for (const item of orderItems) {
        const product = await ProductBranches.findOrFail(
          item.product_branche_id
        );
        if (product.stock < item.quantity) {
          throw new Error(
            `No hay suficiente stock para el producto ${product.product_id}`
          );
        }
        product.stock -= item.quantity;
        await product.save();
      }

      const status = await SalesDetail.createMany(orderItems);

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

      (await SalesDetail.query().where("sale_id", id)).forEach(
        async (product) => {
          await product.merge({ status: false }).save();
        }
      );

      const orderItems = payload.products.map((product) => ({
        sale_id: payload.sale_id,
        product_branche_id: product.product_branche_id,
        quantity: product.quantity,
      }));

      const status = await SalesDetail.createMany(orderItems);

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
