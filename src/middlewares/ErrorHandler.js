const logger = require("../utils/Logger");

class ErrorHandler {
  static handleError(err, req, res, next) {
    // Registra el error en el log
    logger.error(`Error occurred: ${err.message}`);

    // Si el error tiene un status code específico, lo usa, si no, usa 500
    const statusCode = err.statusCode || 500;

    // Responde con el error
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
}

module.exports = ErrorHandler;
