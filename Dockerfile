# Use Node.js 12.16.1 as the base image
FROM node:20.12.2

# Install ganache-cli and truffle globally
RUN npm install -g ganache-cli truffle

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# Set the NODE_OPTIONS to fix the OpenSSL error
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy remaining project files
COPY . .

# Expose ports (3000 for webpack, 8545 for ganache-cli)
EXPOSE 3000 8545

# Default command to be overridden in docker-compose
CMD ["yarn", "start"]
