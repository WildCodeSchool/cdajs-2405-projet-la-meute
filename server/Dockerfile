FROM node:18-alpine

WORKDIR /server

RUN rm -rf node_modules

COPY package*.json ./
RUN npm ci
# Fix for Windows - sh: ts-node-dev not found
RUN npm i -g ts-node-dev

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

COPY . .

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "start"]