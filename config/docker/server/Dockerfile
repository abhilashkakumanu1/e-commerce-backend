FROM node:16-alpine

RUN mkdir app
WORKDIR /app

COPY package*.json ./
COPY yarn.lock /app

RUN yarn install

COPY . .

CMD yarn dev
