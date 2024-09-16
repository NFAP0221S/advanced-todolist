// src/app.ts

import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { todoRouter, userRouter, authRouter } from "@/api/index";
import errorHandler from "@/common/middlewares/errorHandler";
import rateLimiter from "@/common/middlewares/rateLimiter";
import requestLogger from "@/common/middlewares/requestLogger";
import { env } from "@/config/envConfig";
import logger from "@/common/utils/logger";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
