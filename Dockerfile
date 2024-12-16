FROM node:18-alpine

# Instalar OpenSSL
RUN apk add --no-cache openssl

# Crear el directorio donde se guardarán los certificados
RUN mkdir -p /app/secure-proxy/src/config

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Generar los certificados SSL (key y crt) usando openssl
RUN openssl req -x509 -newkey rsa:4096 -keyout /app/secure-proxy/src/config/private.key -out /app/secure-proxy/src/config/certificate.crt -days 365 -nodes -subj "/C=CO/ST=Atlantico/L=Soledad/O=climatecontrolsing/OU=IT/CN=localhost"

# Verificar si los archivos se crearon correctamente
RUN ls -l /app/secure-proxy/src/config

# Exponer el puerto
EXPOSE ${PORT}

# Iniciar la aplicación
CMD ["npm", "start"]
