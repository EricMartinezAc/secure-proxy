import { authenticateToken } from "../controllers/AuthController.js";

export const authMiddleware = (req, res, next) => {
  authenticateToken(req, res, next);
};
