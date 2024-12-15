const AuthController = require("../controllers/AuthController");

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).send("Token is required");
  }

  try {
    req.user = AuthController.verifyToken(token);
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
}

module.exports = authMiddleware;
