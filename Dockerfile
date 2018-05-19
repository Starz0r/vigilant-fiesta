# Stage 0, based on Node.js, to build and compile Angular
FROM node:10 as node

#switch working directory in this container to app
WORKDIR /app

#copy the package.json file into this container
COPY package.json /app/
COPY package-lock.json /app/

#install all the dependencies in this container
RUN npm install --verbose

#copy everything from the current working directory to the app directory in this container
COPY ./ /app/

#set the environment variable env to prod (only applicable in the scope of this container)
ARG env=prod

#build the angular app in production mode
RUN npm run build -- --prod


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13

#copy, from the node container, the /app/dist folder into the public html folder in this container
COPY --from=node /app/dist /usr/share/nginx/html

#copy the nginx configuration file from the current directory into the configuration directory in this container
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf