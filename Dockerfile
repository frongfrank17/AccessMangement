FROM node:13-slim

RUN mkdir -p /usr/src/app

COPY / /usr/src/app

WORKDIR /usr/src/app

RUN npm install --production

EXPOSE 3000

CMD npm start