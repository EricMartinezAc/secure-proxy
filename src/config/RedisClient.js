import Redis from "ioredis";
import { ENV } from "../config/EnvConfig.js"; // Asegúrate de que la ruta sea correcta

// Verifica que las variables de entorno estén correctamente definidas
if (!ENV.REDIS_HOST || !ENV.REDIS_PORT || !ENV.REDIS_PASSWORD) {
  console.error(
    "ERROR: Las variables de entorno de Redis no están configuradas correctamente."
  );
  process.exit(1); // Detiene la ejecución si faltan las credenciales de Redis
}

const redis = new Redis({
  host: ENV.REDIS_HOST, // Usando la variable de entorno
  port: ENV.REDIS_PORT, // Usando la variable de entorno
  password: ENV.REDIS_PASSWORD, // Usando la variable de entorno
});

// Eventos de conexión y error
redis.on("connect", () => {
  console.log("Conectado a Redis Cloud");
});

redis.on("error", (err) => {
  console.error("Error de conexión a Redis Cloud:", err);
  // Si ocurre un error, finaliza la aplicación para evitar que siga ejecutándose sin Redis
  process.exit(1);
});

export default redis;
