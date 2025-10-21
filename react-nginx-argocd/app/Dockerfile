# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
COPY vite.config.js .
COPY index.html .
COPY src ./src
RUN npm install && npm run build

# --- Serve stage ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
