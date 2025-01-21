import { NextFunction, Response } from "express";

import { PossiblyAuthenticatedRequest } from "../helpers/types";
import { verify } from "jsonwebtoken";

export const auth =
  (secret: string) =>
  (
    req: PossiblyAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.headers.authorization) {
      res
        .status(401)
        .json({ success: false, message: "Authorization token missing" });
      return;
    }

    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      res
        .status(401)
        .json({ success: false, message: "Authorization token missing" });
      return;
    }

    try {
      const decoded = verify(token, secret) as { id: number; username: string };
      req.user = decoded;
      next();
    } catch (err) {
      res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }
  };
