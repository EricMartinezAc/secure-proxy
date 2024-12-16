import fs from "fs";
import path from "path";
import { ENV } from "./EnvConfig.js";

export const sslOptions = {
  key: fs.readFileSync(path.resolve(ENV.SSL_KEY_PATH)),
  cert: fs.readFileSync(path.resolve(ENV.SSL_CERT_PATH)),
};
