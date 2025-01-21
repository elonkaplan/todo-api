import { Controller, ERequestType, Request } from "../helpers/types";

import { ConflictException } from "../helpers/exceptions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const controllerWrapper =
  <RequestType = ERequestType.Unauthenticated>(
    controller: Controller<RequestType>
  ): Controller =>
  async (req, res, next) => {
    try {
      await controller(req as Request<RequestType>, res, next);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          next(new ConflictException("Resource already exists"));

          return;
        }
      }

      next(error);
    }
  };
