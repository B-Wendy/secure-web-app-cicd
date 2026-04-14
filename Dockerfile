FROM node:18-alpine@sha256:2e4e3c0f8c7a0d5e9b7b9d3c3e45a3f3b9a8f2f0e5d9b5c1a8e9d4a7c5e6f

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 10000
CMD ["node", "server.js"]
