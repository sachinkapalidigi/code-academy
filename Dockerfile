# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json first to avoid installing multiple times
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run server.js when the container launches
CMD ["npm", "run", "start"]
