const Redis = require("ioredis");
const EnvConfig = require("./EnvConfig");

class RedisClient {
  constructor() {
    if (!RedisClient.instance) {
      this.redis = new Redis({
        host: EnvConfig.get("REDIS_HOST"),
        port: EnvConfig.get("REDIS_PORT"),
        password: EnvConfig.get("REDIS_PASSWORD"),
        tls: {
          rejectUnauthorized: false,
        },
      });
      RedisClient.instance = this;
    }
    return RedisClient.instance;
  }

  getClient() {
    return this.redis;
  }
}

module.exports = new RedisClient();
