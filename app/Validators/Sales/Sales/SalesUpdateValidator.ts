import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SalesUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    client_id: schema.number.optional(),
    employee_id: schema.number.optional(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new sale",
  };
}
