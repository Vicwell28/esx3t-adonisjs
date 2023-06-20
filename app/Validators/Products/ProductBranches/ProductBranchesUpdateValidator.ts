import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProductBranchesUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    stock: schema.number.optional(),
    product_id: schema.number.optional(),
    branche_id: schema.number.optional(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new product branch",
  };
}
