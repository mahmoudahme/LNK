// const winston = require("winston");
// const dotenv = require("dotenv");
import winston from "winston";
import dotenv from "dotenv";
dotenv.config({ path: "config/config.env" });

// date + logger level + message

//Date
const dateFormat = () => {
  return new Date(Date.now().toLocaleString());
};

//loggerLevel
class LoggerService {
  constructor(route) {
    this.route = route;
    const logger = winston.createLogger({
      level: "info",
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} |  ${info.level.toUpperCase()} | ${
          info.message
        } | `;
        message = info.obj
          ? message + `data ${JSON.stringify(info.obj)} | `
          : message;
        return message;
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${process.env.LOG_PATH} / ${route}.log`,
        }),
      ],
    });
    this.logger = logger;
  }

  async info(message) {
    this.logger.log("info", message);
  }
  async error(message) {
    this.logger.log("error", message);
  }
  async debug(message) {
    this.logger.log("debug", message);
  }

  async info(message, obj) {
    this.logger.log("info", message, { obj });
  }
  async error(message, obj) {
    this.logger.log("error", message, { obj });
  }
  async debug(message, obj) {
    this.logger.log("debug", message, { obj });
  }
}
export default LoggerService;
