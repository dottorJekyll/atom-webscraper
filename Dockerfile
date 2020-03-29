FROM node:12.16.1-alpine3.11

ENV CONFIG_PATH=/config
ENV DATA_PATH=/data

RUN apk update && apk add bash

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node ./dist .

ENTRYPOINT ["node", "dist/app.js"]
