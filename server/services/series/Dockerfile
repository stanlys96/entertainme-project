FROM node:12.0-alpine

WORKDIR /var/www/series

ENV PORT=4002

COPY . .

RUN npm install -g nodemon

RUN npm install

CMD [ "nodemon", "app.js" ]