# Containerize the Node.js app

# Use an official Node.js runtime as a parent image
FROM node:current-alpine

# Install build tools for native modules
RUN apk add --no-cache make gcc g++ python3

# Create app directory
RUN mkdir -p /usr/src/app

# Copy the current directory contents into the container at /app
COPY . /usr/src/app

# Set the working directory to /app
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install --legacy-peer-deps

# Recompile bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Expose port 5001 for the app to listen on
EXPOSE 5001

# Start the app
CMD [ "npm", "run", "dev" ]

# How to run:
# Build image from Dockerfile
# docker build -t cmante/cms:node-api .
# Run container from image
# docker run -p 5001:5001 --name cms-node-api cmante/cms:node-api
# Run pre-existing container
# docker start cms-node-api
# Attach to container
# docker attach cms-node-api