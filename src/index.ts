import { connectDB, disconnectDB } from "./connection";
import express, { Express, NextFunction, Request, Response } from "express";

import { NotFoundException } from "./helpers/exceptions";
import { config } from "./config";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import { router } from "./router";

const port = config.app.port || 3030;

const app: Express = express();
app.use(express.json());

app.use(logger);

app.use("/api", router);

// Handle undefined routes
app.use((_: Request, __: Response, next: NextFunction) => {
  next(new NotFoundException());
});

// Centralized error handler
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  connectDB().then(() => {
    console.log("⚡️[server]: Database is connected");
  });
});

const shutdown = () => {
  console.log("Signal received: closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed");
    disconnectDB().then(() => {
      console.log("Database connection closed");
    });
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
