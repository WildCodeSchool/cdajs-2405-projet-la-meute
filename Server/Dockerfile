FROM node:18-bookworm

RUN mkdir /Server
WORKDIR /Server

COPY package*.json ./
RUN npm i

COPY . .

CMD npm run start