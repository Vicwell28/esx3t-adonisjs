import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProductCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(4),
      rules.unique({ table: "products", column: "name" }),
    ]),
    description: schema.string.optional({ trim: true }, [rules.minLength(4)]),
    product_category_id: schema.number(),
    price: schema.number(),
    url_img: schema.string()
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new view category",
  };
}
