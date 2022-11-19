import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class OpenAccountValidator {
  public schema = schema.create({
    name: schema.string(),

    email: schema.string([
      rules.email(),
      rules.unique({ table: "clients", column: "email" }),
    ]),
    password: schema.string([
      rules.alphaNum(),
      rules.minLength(6),
      rules.maxLength(6),
      rules.regex(/^(?!.*(.).*\1)[0-9]+$/),
    ]),

    cpf: schema.string({}, [
      rules.maxLength(11),
      rules.minLength(11),
      rules.regex(/^[0-9]+$/),
      rules.unique({ table: "clients", column: "cpf" }),
    ]),

    birth_date: schema.date({ format: "yyyy-mm-dd" }, [
      rules.before(17, "years"),
    ]),
  });
}
