# Force rebuild - test 02

# Étape 1 : Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:stable-alpine
EXPOSE 80
COPY --from=build /app/dist /usr/share/nginx/html

# Supprimer les conf par défaut et copier la tienne
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/default.conf


