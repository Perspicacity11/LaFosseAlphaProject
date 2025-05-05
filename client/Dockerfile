FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

RUN npm run build

# Uses a lightweight web server to serve the static files; UNSURE ABOUT THIS!!!
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80
CMD nginx -g daemon off