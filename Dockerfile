FROM node:12.16.1-alpine3.11

ENV CONFIG_PATH=/config
ENV DATA_PATH=/data

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node ./dist .

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
