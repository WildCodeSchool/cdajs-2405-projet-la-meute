FROM node:18-alpine

WORKDIR /client

RUN rm -rf node_modules

COPY package*.json ./
RUN npm ci

COPY . .
# Build is needed for build in github action
RUN npm run build