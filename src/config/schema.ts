import Joi from "joi";

export const schema = Joi.object<{
  APP_PORT?: number;
  DATABASE_URL: string;
  AUTH_ACCESS_TOKEN_SECRET: string;
  AUTH_REFRESH_TOKEN_SECRET: string;
}>()
  .keys({
    APP_PORT: Joi.number().positive().optional(),

    DATABASE_URL: Joi.string().uri().required(),

    AUTH_ACCESS_TOKEN_SECRET: Joi.string().required(),
    AUTH_REFRESH_TOKEN_SECRET: Joi.string().required(),
  })
  .unknown();
