import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProductBranchesCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    stock: schema.number(),
    product_id: schema.number(),
    branche_id: schema.number(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new product branch",
  };
}
