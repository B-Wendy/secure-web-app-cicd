FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the app
COPY . .

# Expose the port Render expects
EXPOSE 10000

# Start your Node.js app
CMD ["node", "server.js"] 