# ---- Build Stage ----
FROM node:22.12.0-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/amabeef
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
