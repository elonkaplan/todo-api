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
      color: Joi.string().optional(),
    }),
  };

  update = {
    body: Joi.object({
      title: Joi.string(),
      color: Joi.string(),
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
