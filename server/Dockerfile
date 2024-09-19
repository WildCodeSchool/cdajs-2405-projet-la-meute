FROM node:18-bookworm

RUN mkdir /server
WORKDIR /server

COPY package*.json ./
RUN npm i

COPY . .

CMD npm run start