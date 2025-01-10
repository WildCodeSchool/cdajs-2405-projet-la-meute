FROM node:18-alpine

WORKDIR /server

RUN rm -rf node_modules

COPY package*.json ./
RUN npm ci
# Fix for Windows - sh: ts-node-dev not found
RUN npm i -g ts-node-dev

COPY . .

CMD npm run start