### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:12.18.4-alpine3.12 as builder

COPY package.json package-lock.json ./

RUN apk --no-cache add sudo

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN sudo npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN sudo npm cache clean --force

ARG CAPTCHA_KEY="default"
ARG API_URL="/api"

RUN apk --no-cache add sd --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing
RUN sudo sd "\{\{\{CAPTCHA_KEY\}\}\}" $CAPTCHA_KEY ./src/environments/environments.prod.ts
RUN sudo sd "\{\{\{API_URL\}\}\}" $API_URL ./src/environments/environments.prod.ts

RUN sudo npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM alpine:3.11.11

COPY --from=builder /ng-app/dist /app/