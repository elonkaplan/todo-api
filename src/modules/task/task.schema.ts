import Joi from "joi";

export class TaskSchema {
  get = {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  };

  create = {
    body: Joi.object({
      title: Joi.string().required(),
      color: [Joi.string().optional(), Joi.allow(null)],
    }),
  };

  update = {
    body: Joi.object({
      title: Joi.string(),
      color: [Joi.string().optional(), Joi.allow(null)],
      completed: Joi.boolean(),
    }),
    params: Joi.object({
      id: Joi.number().required(),
    }),
  };

  delete = {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  };
}
