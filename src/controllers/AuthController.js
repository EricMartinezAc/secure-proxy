import jwt from "jsonwebtoken";
import { ENV } from "../config/EnvConfig.js";

export const generateToken = (user) => {
  return jwt.sign(user, ENV.JWT_SECRET, { expiresIn: "1h" });
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, ENV.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
