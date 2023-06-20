import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CityCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(4),
      rules.unique({ table: "cities", column: "name" }),
    ]),
    state_id: schema.number(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new cities",
  };
}
