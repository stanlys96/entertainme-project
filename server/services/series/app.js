const express = require('express');
const { connect } = require('./config/mongodb');
const app = express();
const PORT = 4002;
const router = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

connect()
  .then(async (db) => {
    console.log('MongoDB successfully connected!');

    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}...`);
    })
  })
