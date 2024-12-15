const winston = require("winston");

class Logger {
  static getLogger() {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: "info",
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: "app.log" }),
        ],
      });
    }
    return Logger.instance;
  }
}

module.exports = Logger.getLogger();
