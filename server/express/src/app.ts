// src/app.ts

import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
// import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
// import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middlewares/errorHandler";
import rateLimiter from "@/common/middlewares/rateLimiter";
import requestLogger from "@/common/middlewares/requestLogger";
import { env } from "@/common/utils/envConfig";
import logger from "@/common/utils/logger"; // Winston 로거 임포트

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
// app.use("/health-check", healthCheckRouter);
// app.use("/users", userRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
