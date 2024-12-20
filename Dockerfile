# Dockerfile for React

# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy the current directory contents into the container
COPY . /app/

# Expose port 3000 for the React app
EXPOSE 3000

# Run the React application
CMD ["npm", "start"]
