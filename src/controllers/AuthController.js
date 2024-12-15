const jwt = require("jsonwebtoken");
const EnvConfig = require("../config/EnvConfig");

class AuthController {
  generateToken(user) {
    const payload = { userId: user.id };
    return jwt.sign(payload, EnvConfig.get("JWT_SECRET"), { expiresIn: "1h" });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, EnvConfig.get("JWT_SECRET"));
    } catch (error) {
      throw new Error("Invalid Token");
    }
  }
}

module.exports = new AuthController();
