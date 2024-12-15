const httpProxy = require("http-proxy");
const RedisClient = require("../config/RedisClient");
const logger = require("../utils/Logger");

class ProxyController {
  constructor() {
    this.proxy = httpProxy.createProxyServer({});
    this.redis = RedisClient.getClient();
  }

  forwardRequest(req, res) {
    const target = this.getTargetServer(req);
    this.proxy.web(req, res, { target }, (error) => {
      logger.error(`Proxy error: ${error.message}`);
      res.status(500).send("Proxy Error");
    });
  }

  getTargetServer(req) {
    // Balanceo de carga y lógica personalizada
    // Aquí se puede usar Redis para almacenar y recuperar servidores activos
    return "http://backend_server"; // Reemplaza con la lógica de backend
  }
}

module.exports = new ProxyController();
