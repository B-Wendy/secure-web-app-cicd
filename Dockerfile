# use official node image (LTS)
FROM node:18-alpine

# create app dir
WORKDIR /app

# copy only package files first (cache)
COPY package.json package-lock.json* ./

# install deps (production)
RUN npm ci --only=production

# copy app
COPY . .

# serve on port from env or 3000
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
