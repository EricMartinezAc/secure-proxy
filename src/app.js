// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import httpProxy from "http-proxy";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Logger from "./utils/Logger.js";
import ResponsiveUtils from "./utils/ResponsiveUtils.js";
import ErrorHandler from "./middlewares/ErrorHandler.js";
import RateLimiter from "./middlewares/RateLimiter.js";
import redis from "./config/RedisClient.js";

// Cargar las variables de entorno
dotenv.config();

// Configuración del proxy
const proxy = httpProxy.createProxyServer();
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(RateLimiter);

// Ruta de autenticación con JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validar usuario (esto es solo un ejemplo, en producción usa una base de datos)
  if (username === "admin" && password === "password123") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return ResponsiveUtils.sendResponse(res, 200, "Login Successful", {
      token,
    });
  } else {
    return ResponsiveUtils.sendErrorResponse(res, 401, "Invalid Credentials");
  }
});

// Ruta de proxy
app.all("/proxy/*", (req, res) => {
  const targetUrl = req.originalUrl.replace("/proxy", ""); // Elimina el prefijo '/proxy'

  Logger.info(`Proxying request to: ${targetUrl}`);

  // Realiza el reenvío de la solicitud al servidor de destino
  proxy.web(req, res, { target: targetUrl }, (err) => {
    Logger.error(
      `Error while proxying request to ${targetUrl}: ${err.message}`
    );
    ResponsiveUtils.sendErrorResponse(res, 500, "Internal Server Error");
  });
});

// Ruta de prueba para comprobar el estado
app.get("/health", (req, res) => {
  ResponsiveUtils.sendResponse(res, 200, "API is running");
});

// Middleware de error
app.use(ErrorHandler.handleError);

export default app;
