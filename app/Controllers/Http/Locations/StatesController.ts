import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import State from "App/Models/Locations/State";
import StateCreateValidator from "App/Validators/Locations/State/StateCreateValidator";
import StateUpdateValidator from "App/Validators/Locations/State/StateUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class StatesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let state = await State
      .query()
      .preload("city")

      if (orderBy === "des") {
        state = state.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: state,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(StateCreateValidator);

      const status = await State.create(payload);

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
      const state = await State.findBy("id", id);

      if (!state) {
        return response.notFound({ error: "state not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: state,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(StateUpdateValidator);
      const id = request.param("id");

      const state = await State.findBy("id", id);

      if (!state) {
        return response.notFound({ error: "state not found" });
      }

      const status = await state!.merge(payload).save();

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
      const state = await State.findBy("id", id);

      if (!state) {
        return response.notFound({ error: "state not found" });
      }

      let userDeleted = await state.merge({ status: !state.status }).save();

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
