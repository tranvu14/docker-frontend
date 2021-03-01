FROM node:13-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm install

USER node

CMD ["npm", "start"]
