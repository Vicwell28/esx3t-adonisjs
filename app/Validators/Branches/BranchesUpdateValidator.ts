import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BranchesUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.minLength(4)]),
    postal_code: schema.string.optional({ trim: true }, [rules.minLength(4)]),
    address: schema.string.optional({ trim: true }, [
      rules.minLength(4),
    ]),
    citie_id: schema.number.optional(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new branches",
  };
}
