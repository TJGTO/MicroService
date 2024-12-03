# Use a lightweight Node.js image (Alpine-based)
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app will run on
EXPOSE 3001

# Run the application
CMD ["node", "dist/index.js"]
