FROM node:18-alpine

WORKDIR /server

RUN rm -rf node_modules

COPY package*.json ./
RUN npm ci
# Fix for Windows - sh: ts-node-dev not found
RUN npm i -g ts-node-dev

COPY . .

## Run the app without the migration check
#CMD npm run start

## Automatic migration (replace CMD npm run start with this)
CMD npm run typeorm migration:run -- -d ./src/dataSource/dataSource.ts && npm run start