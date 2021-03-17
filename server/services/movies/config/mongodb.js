const { MongoClient } = require('mongodb');

let database = null;

async function connect() {
  try {
    const uri = 'mongodb://mongo:27017';
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db('entertainMe_DB');
    database = db;
    return db;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  connect,
  getDatabase() {
    return database
  }
}