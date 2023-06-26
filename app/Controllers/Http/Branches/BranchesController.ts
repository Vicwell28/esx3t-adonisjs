import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Branch from "App/Models/Branches/Branch";
import BranchesCreateValidator from "App/Validators/Branches/BranchesCreateValidator";
import BranchesUpdateValidator from "App/Validators/Branches/BranchesUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class BranchesController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const { orderBy } = request.all() as { orderBy?: string };

      let branch = await Branch.query().preload("city", (query) => {
        query.preload("state");
      });

      if (orderBy === "des") {
        branch = branch.reverse();
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: branch,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(BranchesCreateValidator);

      const status = await Branch.create(payload);

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
      const branch = await Branch.findBy("id", id);

      if (!branch) {
        return response.notFound({ error: "branch not found" });
      }

      await branch.load("city", (query) => {
        query.preload("state");
      });

      return response.ok({
        message: RETURN_DATA_OK,
        data: branch,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(BranchesUpdateValidator);
      const id = request.param("id");

      const branch = await Branch.findBy("id", id);

      if (!branch) {
        return response.notFound({ error: "branch not found" });
      }

      const status = await branch!.merge(payload).save();

      await status.load("city", (query) => {
        query.preload("state");
      });

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
      const branch = await Branch.findBy("id", id);

      if (!branch) {
        return response.notFound({ error: "branch not found" });
      }

      let userDeleted = await branch.merge({ status: !branch.status }).save();

      await userDeleted.load("city", (query) => {
        query.preload("state");
      });

      return response.ok({
        message: RETURN_DATA_OK,
        data: userDeleted,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }
}
