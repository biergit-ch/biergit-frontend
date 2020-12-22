### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10 as builder

COPY package.json yarn.lock ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /biergit-frontend && mv ./node_modules ./biergit-frontend

WORKDIR /biergit-frontend

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run-script build --prod

## Stage 2: Run
FROM nginx:alpine

## Copy our default nginx config
COPY config/nginx.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /biergit-frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]