import { pino } from "pino";

export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const HEALTH_CHECK_PATH = "/health";

export const logger = pino({
  level: LOG_LEVEL,
});
