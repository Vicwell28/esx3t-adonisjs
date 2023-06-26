import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string.optional(),
    fname: schema.string.optional(),
    lname: schema.string.optional(),
    date_birth: schema.date.optional(),
    rfc: schema.string.optional(),
    address: schema.string.optional(),
    postal_code: schema.string.optional(),
    role_id: schema.number.optional(),
    city_id: schema.number.optional(),
    branche_id: schema.number.optional(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new sale",
  };
}
