import { AuthController } from "./auth.controller";
import { AuthSchema } from "./auth.schema";
import { ERequestType } from "../../helpers/types";
import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { config } from "../../config";
import { controllerWrapper } from "../../middlewares/controllerWrapper";
import { validator } from "../../middlewares/validator";

export const authRouter = Router();

const authSchema = new AuthSchema();
const authController = new AuthController();

authRouter.post(
  "/login",
  validator(authSchema.login.body),
  controllerWrapper(authController.login)
);

authRouter.post(
  "/register",
  validator(authSchema.register.body),
  controllerWrapper(authController.register)
);

authRouter.get(
  "/me",
  auth(config.auth.accessTokenSecret),
  controllerWrapper<ERequestType.Authenticated>(authController.me)
);

authRouter.post(
  "/logout",
  auth(config.auth.accessTokenSecret),
  controllerWrapper<ERequestType.Authenticated>(authController.logout)
);

console.log(config.auth.refreshTokenSecret, "config.auth.refreshTokenSecret");

console.log(config.auth.accessTokenSecret, "config.auth.accessTokenSecret");

authRouter.post(
  "/refresh",
  auth(config.auth.refreshTokenSecret),
  controllerWrapper<ERequestType.Authenticated>(authController.refresh)
);
