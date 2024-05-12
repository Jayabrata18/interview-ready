
FROM node:14 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn add

COPY . ./

# Build the app
RUN yarn build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Remove default NGINX static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from previous stage to NGINX directory
COPY --from=builder /app/dist /usr/share/nginx/html
# custom build
# COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
