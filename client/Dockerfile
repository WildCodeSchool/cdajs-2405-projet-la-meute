FROM node:18-bookworm

WORKDIR /client

RUN rm -rf node_modules

COPY package*.json ./
RUN npm ci

COPY . .
# Build is needed for build in github action
RUN npm run build

CMD npm run preview