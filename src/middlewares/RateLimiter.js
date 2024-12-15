const rateLimit = require("express-rate-limit");
const RedisClient = require("../config/RedisClient");

const limiter = rateLimit({
  store: new RedisStore({
    client: RedisClient.getClient(),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 solicitudes por IP
  message: "Too many requests, please try again later",
});

module.exports = limiter;
