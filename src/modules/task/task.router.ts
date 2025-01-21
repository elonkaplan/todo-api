import { ERequestType } from "../../helpers/types";
import { Router } from "express";
import { TaskController } from "./task.controller";
import { TaskSchema } from "./task.schema";
import { auth } from "../../middlewares/auth";
import { config } from "../../config";
import { controllerWrapper } from "../../middlewares/controllerWrapper";
import { validator } from "../../middlewares/validator";

export const taskRouter = Router();

const taskSchema = new TaskSchema();
const taskController = new TaskController();

taskRouter.get(
  "/",
  auth(config.auth.accessTokenSecret),
  controllerWrapper<ERequestType.Authenticated>(taskController.getTasks)
);

taskRouter.post(
  "/",
  auth(config.auth.accessTokenSecret),
  validator(taskSchema.create.body),
  controllerWrapper<ERequestType.Authenticated>(taskController.createTask)
);

taskRouter.put(
  "/:id",
  auth(config.auth.accessTokenSecret),
  validator(taskSchema.update.body),
  validator(taskSchema.update.params, "params"),
  controllerWrapper<ERequestType.Authenticated>(taskController.updateTask)
);

taskRouter.delete(
  "/:id",
  auth(config.auth.accessTokenSecret),
  validator(taskSchema.delete.params, "params"),
  controllerWrapper<ERequestType.Authenticated>(taskController.deleteTask)
);
