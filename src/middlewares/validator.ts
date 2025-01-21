import { NextFunction, Request, Response } from "express";

import { Schema } from "joi";

export const validator = (
  schema: Schema,
  property: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(400).json({ success: false, errors });
      return;
    }

    next();
  };
};
