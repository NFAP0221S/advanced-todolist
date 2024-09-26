import 'module-alias/register';
import { env } from "@/config/envConfig";
import { app, logger } from "@/server";

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, DB_HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${DB_HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);