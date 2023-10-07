# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app for production
RUN npm run build -- --prod

# Use a smaller, production-ready base image
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the Nginx server's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
