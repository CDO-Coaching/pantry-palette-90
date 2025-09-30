# Force rebuild - test 01
# Étape 1 : Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:stable-alpine
# Pour Vite, le build sort dans /app/dist
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🔍 Debug : vérifier que nginx.conf est bien copié
RUN ls -la /etc/nginx/conf.d/
RUN cat /etc/nginx/conf.d/default.conf
