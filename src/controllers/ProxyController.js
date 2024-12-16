import httpProxy from "http-proxy";
import { redisClient } from "../config/RedisClient.js";
const proxy = httpProxy.createProxyServer();

export const forwardRequest = (req, res) => {
  const target =
    process.env.BACKEND_SERVER_URL || "https://api-publica.onrender.com";

  redisClient.set("lastRequestTime", new Date().toISOString(), (err, reply) => {
    if (err) {
      console.error("Error saving to Redis:", err);
    }
    proxy.web(req, res, { target }, (err) => {
      if (err) {
        console.error("Error in proxying request:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  });
};
