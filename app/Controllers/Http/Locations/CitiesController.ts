import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import City from "App/Models/Locations/City";
import CityCreateValidator from "App/Validators/Locations/City/CityCreateValidator";
import CityUpdateValidator from "App/Validators/Locations/City/CityUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class CitiesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let city = await City
      .query()
      .preload("state")

      if (orderBy === "des") {
        city = city.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: city,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CityCreateValidator);

      const status = await City.create(payload);

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
      const city = await City.findBy("id", id);

      if (!city) {
        return response.notFound({ error: "city not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: city,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CityUpdateValidator);
      const id = request.param("id");

      const city = await City.findBy("id", id);

      if (!city) {
        return response.notFound({ error: "city not found" });
      }

      const status = await city!.merge(payload).save();

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
      const city = await City.findBy("id", id);

      if (!city) {
        return response.notFound({ error: "city not found" });
      }

      let userDeleted = await city.merge({ status: !city.status }).save();

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
