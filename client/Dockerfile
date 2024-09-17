FROM node:18-bookworm

RUN mkdir /client
WORKDIR /client

COPY package*.json ./
RUN npm i

COPY . .

CMD npm run dev