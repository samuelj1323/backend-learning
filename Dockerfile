# User an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the conainer
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port that the app runs on 
EXPOSE 5003 

# Define the command to boot your application
CMD ["node", "./src/server.js"]