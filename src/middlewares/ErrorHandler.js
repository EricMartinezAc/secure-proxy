// src/middlewares/ErrorHandler.js
class ErrorHandler {
  static handleError(err, req, res, next) {
    console.error("error", err.stack); // Registrar el error en la consola

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

export default ErrorHandler;
