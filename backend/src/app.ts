// Import required modules
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import i18n from "./utils/i18n.ts";
import { handle } from "i18next-http-middleware";
import { DatabaseError } from "pg-protocol";
import routes from "./app/index.ts"

// Create the Express app
const app: Application = express();

app.use(cors());

// i18n
app.use(handle(i18n));

// Default configuration
app.set("json spaces", 2);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(routes)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof DatabaseError) {
    res.status(400).json({
      message: err.message,
      error: err,
    });
    return;
  }
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "[|*] x 500",
    error: process.env.NODE_ENV === "production" ? undefined : err,
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "404 - ('_>')___+-- get out!",
  });
});

// Export the app module
export default app;
