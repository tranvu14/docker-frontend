FROM node:13-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]

RUN addgroup -g 1901 appgroup
RUN adduser -D -u 1000 appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser