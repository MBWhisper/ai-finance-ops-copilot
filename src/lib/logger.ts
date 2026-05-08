import pino from "pino";

const isDev = process.env.NODE_ENV === "development";

export const logger = pino({
  level: isDev ? "info" : "warn",
  transport: isDev
    ? { target: "pino-pretty", options: { colorize: true } }
    : undefined,
});
