# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install app dependencies
RUN npm install

# Expose port 3000
EXPOSE 3007

# Set environment variables
ENV PORT 3007

# Start the app
CMD [ "npm", "start" ]

