import { Router } from "express";
import { authRouter } from "./modules/auth/auth.router";
import { taskRouter } from "./modules/task/task.router";

export const router = Router();

router.use("/auth", authRouter);
router.use("/tasks", taskRouter);
