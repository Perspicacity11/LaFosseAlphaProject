FROM node:8.16.1-alpine
WORKDIR /app
COPY . /app
RUN npm i
ENV PORT=3000
EXPOSE 3000
CMD node index.js