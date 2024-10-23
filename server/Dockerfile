FROM node:18-bookworm

RUN mkdir /server
WORKDIR /server

COPY package*.json ./
RUN npm i
# Fix for Windows - sh: ts-node-dev not found
RUN npm i -g ts-node-dev

COPY . .

CMD npm run start