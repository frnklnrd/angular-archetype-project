# Crea una imagen basada en la imagen de Node.js
FROM node:16-alpine as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de configuración de la aplicación a la imagen del contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --force

# Copia todo el código fuente de la aplicación a la imagen del contenedor
COPY . .

# Compila la aplicación de Angular en la carpeta /dist
RUN npx nx build app --prod --base-href ./

# Crea una nueva imagen basada en nginx
FROM nginx:alpine

# Copia los archivos estáticos de la aplicación compilada en la carpeta /usr/share/nginx/html
COPY --from=build /app/dist/apps/app /usr/share/nginx/html

# Copia el archivo de configuración de nginx a la imagen del contenedor
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para que se pueda acceder a la aplicación desde fuera del contenedor
EXPOSE 80

# Inicia nginx en primer plano cuando se inicia el contenedor
CMD ["nginx", "-g", "daemon off;"]
