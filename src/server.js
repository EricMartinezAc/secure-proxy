const https = require("https");
const app = require("./app");
const sslConfig = require("./config/SSLConfig");
const logger = require("./utils/Logger");

const server = https.createServer(sslConfig.getSSLConfig(), app);

server.listen(process.env.PORT, () => {
  logger.info(`Server is running on https://localhost:${process.env.PORT}`);
});
