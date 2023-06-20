import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SalesDetailUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    sale_id: schema.number(),
    products: schema.array().members(
      schema.object().members({
        product_branche_id: schema.number(),
        quantity: schema.number([rules.range(1, 100)]),
      })
    ),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new view category",
  };
}
