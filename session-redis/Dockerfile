# syntax=docker/dockerfile:1
FROM node:19-alpine3.15
WORKDIR /
COPY ./app/ .
RUN npm install --production
CMD ["node", "index.js"]
EXPOSE 3000