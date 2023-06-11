import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RoleViewUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    views_id:  schema.array().members(schema.number()),
    role_id: schema.number(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new view category",
  };
}
