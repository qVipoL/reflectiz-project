FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN yarn

RUN yarn build