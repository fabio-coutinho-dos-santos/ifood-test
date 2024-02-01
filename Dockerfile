FROM node:18-alpine

WORKDIR /app

EXPOSE 3000

COPY . /app/

RUN npm ci && npm run build

ENTRYPOINT [ "npm", "run" ]