import Joi from "joi";

export class TaskSchema {
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
