FROM node:16-alpine as builder

WORKDIR /app

COPY . .

# Build the app
RUN yarn install

# EXPOSE 3000

# if dev mode then
# CMD ["yarn", "run","start"]

RUN yarn build

# # Stage 2: Serve the app with NGINX
FROM nginx:alpine

# set working directory of nginx asset
WORKDIR /usr/share/nginx/html/*

 # Remove default NGINX static files
RUN rm -rf ./*

# Copy static files from the build stage
# COPY --from=build-stage /app/dist .
# # Expose port 80
EXPOSE 80

# # Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
