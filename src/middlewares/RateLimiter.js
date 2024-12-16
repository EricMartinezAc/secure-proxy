import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 100 peticiones por cada 15 minutos
  message: "Too many requests, please try again later.",
});

export default limiter;
