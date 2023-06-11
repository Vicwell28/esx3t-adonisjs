import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class OrderDetailUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.minLength(4),
      rules.unique({ table: "view", column: "name" }),
    ]),
    description: schema.string.optional({ trim: true }, [rules.minLength(4)]),
    view_category_id: schema.number.optional(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new view category",
  };
}
