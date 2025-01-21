import { Router } from "express";
import { authRouter } from "./modules/auth/auth.router";

export const router = Router();

router.use("/auth", authRouter);
