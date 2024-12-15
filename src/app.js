const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sslConfig = require("./config/SSLConfig");
const RedisClient = require("./config/RedisClient");
const ProxyController = require("./controllers/ProxyController");
const authMiddleware = require("./middlewares/AuthMiddleware");
const ErrorHandler = require("./middlewares/ErrorHandler");
const rateLimiter = require("./middlewares/RateLimiter");

const app = express();

// Seguridad
app.use(helmet());
app.use(cors());

// Middleware de autenticación y limitación de tasa
app.use(authMiddleware);
app.use(rateLimiter);

// Rutas de Proxy
app.use("/proxy", ProxyController.forwardRequest);

module.exports = app;
