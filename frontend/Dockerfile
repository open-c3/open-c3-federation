FROM node:18.17.0-alpine3.18

WORKDIR /app

RUN npm install -g pnpm@8.7.5

COPY package*.json ./

RUN pnpm install --force --registry=https://registry.npm.taobao.org

COPY . .

RUN pnpm run build