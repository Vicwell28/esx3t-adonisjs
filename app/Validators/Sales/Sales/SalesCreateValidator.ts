import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SalesCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    client_id: schema.number(),
    employee_id: schema.number(),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new sale",
  };
}
