# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) first for caching dependencies
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
