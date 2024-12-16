import https from "https";
import { sslOptions } from "./config/SSLConfig.js";
import { ENV } from "./config/EnvConfig.js";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
try {
  https.createServer(sslOptions, app).listen(ENV.PORT, () => {
    console.log(`Proxy seguro funcionando`);
  });
} catch (error) {
  console.error(error);
}
