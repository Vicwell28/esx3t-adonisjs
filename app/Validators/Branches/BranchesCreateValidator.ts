import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BranchesCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(4)]),
    postal_code: schema.string({ trim: true }, [rules.minLength(4)]),
    address: schema.string({ trim: true }, [
      rules.minLength(4),
      rules.unique({ table: "branches", column: "address" }),
    ]),
    citie_id: schema.number(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new branches",
  };
}
