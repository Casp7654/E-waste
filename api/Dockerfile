# Use Node.js version 14 as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Set environment variables
ENV PORT=8080

# Expose port 8080 for the web server
EXPOSE 8080

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Start the web server
CMD ["npm", "run", "dev"]