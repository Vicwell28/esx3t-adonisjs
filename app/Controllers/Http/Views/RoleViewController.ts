import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Role from "App/Models/Users/Role";
import RoleView from "App/Models/Views/RoleView";
import RoleViewCreateValidator from "App/Validators/Views/RoleView/RoleViewCreateValidator";
import RoleViewUpdateValidator from "App/Validators/Views/RoleView/RoleViewUpdateValidator";

const RETURN_DATA_OK = "Return data ok";
export default class RoleViewController {
  public async index({ response, request, auth }: HttpContextContract) {
    try {
      const { isAuth } = request.all();

      if (isAuth) {
        let roleView = await Role.findBy("id", auth.user!.role_id);

        await roleView!.load("views", (query) => {
          query.preload("viewCategory");
        });

        // Obtener las vistas cargadas
        let views = roleView!.views;

        // Agrupar las vistas por categoría
        let groupedViews = views.reduce((categories, view) => {
          let category = view.viewCategory;
          let categoryId = category.id;

          // Si la categoría aún no existe en el objeto agrupado, añádela
          if (!categories[categoryId]) {
            categories[categoryId] = {
              category: category.name,
              views: [],
            };
          }

          // Añadir la vista a la categoría correspondiente
          categories[categoryId].views.push(view);

          return categories;
        }, {});

        // Convertir el objeto en un array
        let categoriesArray = Object.values(groupedViews);

        // Ahora categoriesArray contiene las vistas agrupadas por categoría
        // return response.json({ categoriesArray });

        return response.ok({
          message: RETURN_DATA_OK,
          data: categoriesArray,
        });
      } else {
        let roleView = await RoleView.all();

        return response.ok({
          message: RETURN_DATA_OK,
          data: roleView,
        });
      }
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RoleViewCreateValidator);

      const roleView = await Role.findBy("id", payload.role_id);

      if (!roleView) {
        return response.notFound({ error: "roleView not found" });
      }

      await roleView.related("views").sync(payload.views_id);

      await roleView.load("views")

      return response.ok({
        message: RETURN_DATA_OK,
        data: roleView,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const roleView = await RoleView.findBy("id", id);

      if (!roleView) {
        return response.notFound({ error: "roleView not found" });
      }

      return response.ok({
        message: RETURN_DATA_OK,
        data: roleView,
      });
    } catch (e) {
      return response.badRequest({ error: { message: e } });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const id = request.param("id");
      const roleView = await RoleView.findBy("id", id);

      if (!roleView) {
        return response.notFound({ error: "roleView not found" });
      }

      let userDeleted = await roleView
        .merge({ status: !roleView.status })
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
