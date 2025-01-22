import { NextFunction, Request, Response } from "express";

import { AppError } from "../helpers/exceptions";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal server error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
