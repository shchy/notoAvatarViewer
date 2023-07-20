FROM node:18-alpine3.18 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY ./ /app/
RUN yarn build 

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.25.1
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
