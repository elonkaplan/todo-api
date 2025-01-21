import Joi from "joi";

export class AuthSchema {
  login = {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };

  register = {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };
}
