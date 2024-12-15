require("dotenv").config();

class EnvConfig {
  static get(key) {
    return process.env[key];
  }
}

module.exports = EnvConfig;
