# Use a node image for building Vite projects
FROM node:18 as builder

# Set working directory inside the container
WORKDIR /client

COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the frontend for "production"
RUN npm run build

EXPOSE 5173

# Command to start the Vite development server
CMD ["npm", "run", "dev"]
