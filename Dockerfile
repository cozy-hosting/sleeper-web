FROM node:current-alpine as BUILD

# Install dependencies
RUN apk update && \
    apk add yarn

# Setup project build context
RUN mkdir /project
WORKDIR /project
COPY . .
RUN yarn install

# Run unit tests
RUN yarn test:unit

# Build project into /project/build
RUN yarn build

FROM caddy/caddy:alpine as DEPLOY

# Add built vue app
COPY --from=BUILD /project/dist /var/www/html

# Add caddy server config
COPY ./Caddyfile /etc/caddy/Caddyfile
