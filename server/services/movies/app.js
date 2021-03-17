const express = require('express');
const { connect } = require('./config/mongodb');
const app = express();
const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect()
  .then(async (db) => {
    console.log('MongoDB successfully connected!');
    const router = require('./routes/index');
    app.use(router);
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}...`);
    })
  })
