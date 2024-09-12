FROM node:18-bookworm

RUN mkdir /Client
WORKDIR /Client

COPY package*.json ./
RUN npm i

COPY . .

CMD npm run dev