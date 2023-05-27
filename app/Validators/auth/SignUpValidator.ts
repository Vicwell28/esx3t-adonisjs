import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SignUpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string([
      rules.minLength(5),
      rules.unique({ table: "users", column: "username" }),
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string([rules.confirmed(), rules.minLength(5)]),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new account",
  };
}
