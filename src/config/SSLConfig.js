const fs = require("fs");
const path = require("path");
const EnvConfig = require("./EnvConfig");

class SSLConfig {
  static getSSLConfig() {
    return {
      key: fs.readFileSync(path.resolve(EnvConfig.get("SSL_KEY_PATH"))),
      cert: fs.readFileSync(path.resolve(EnvConfig.get("SSL_CERT_PATH"))),
    };
  }
}

module.exports = SSLConfig;
