import fastify from "fastify";
import cors from "@fastify/cors";
import { logger } from "./config";
import { HEALTH_CHECK_PATH } from "./constants";
import router from "./router";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

const startServer = async () => {
  const server = fastify({
    logger: logger,
  });

  server.register(cors, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
      "Accept-Language",
      "User-Agent",
      "Host",
      "X-Forwarded-For",
      "X-Amz-Date",
      "X-Api-Key",
      "X-Amz-Security-Token",
      "tracestate",
      "traceparent",
      "X-Instrumentation",
      "Idempotency-Key",
      "account_id",
    ],
  });

  // TODO: Add error handler

  server.get(HEALTH_CHECK_PATH, { logLevel: "error" }, async (_req, reply) => {
    reply.send({ status: "UP" });
  });

  server.listen({ host: "0.0.0.0", port: port }, (err, address) => {
    if (err) {
      server.log.error({ err: err }, "Failed to start application");
      process.exit(1);
    }
    server.log.info(`Application started. Server listening at ${address}`);
  });
  server.register(router);
};

process.on("unhandledRejection", (err) => {
  logger.error({ err }, "Unexpected rejection. Stopping application...");
  process.exit(1);
});

startServer();
