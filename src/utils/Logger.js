// src/utils/Logger.js
import winston from "winston";

// Crear el logger
const logger = winston.createLogger({
  level: "info", // El nivel de logs por defecto
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Mostrar logs en consola
    new winston.transports.File({ filename: "logs/combined.log" }), // Guardar logs en archivo
  ],
});

export default logger;
