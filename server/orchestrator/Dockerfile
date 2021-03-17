FROM node:12.0-alpine

WORKDIR /var/www/entertainMe

ENV PORT=4000

COPY . .

RUN npm install -g nodemon

RUN npm install

CMD [ "nodemon", "app.js" ]