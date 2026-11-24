
# Use the official Playwright image with matching version
FROM mcr.microsoft.com/playwright:v1.64.1-noble

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the complete project
COPY . .

# Set CI environment variable
ENV CI=true

# Execute CI-compatible Playwright tests
CMD ["npm", "run", "test:ci"]
