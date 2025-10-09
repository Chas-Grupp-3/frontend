FROM node:20

WORKDIR /app

# Copy package files with correct paths
COPY package.json package-lock.json* ./
COPY turbo.json ./

# Copy package.json files from apps and packages
COPY apps/mobile/package.json ./apps/mobile/
COPY apps/web/package.json ./apps/web/
COPY packages/UI/package.json ./packages/UI/

# Clear npm cache and install fresh dependencies
RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json

# Install all dependencies (this should install workspace dependencies)
RUN npm install

# Copy source code
COPY . .

# Expose ports
EXPOSE 5173 5174

# Run all apps
CMD ["npm", "run", "dev"]