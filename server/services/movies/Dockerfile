FROM node:12.0-alpine

WORKDIR /var/www/movies

ENV PORT=4001

COPY . .

RUN npm install -g nodemon

RUN npm install

CMD [ "nodemon", "app.js" ]