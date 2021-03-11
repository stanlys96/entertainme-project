const { getDatabase } = require('../config/mongodb');

const ObjectID = require('mongodb').ObjectID;

class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray();
  }

  static findingOne(id) {
    return getDatabase().collection('movies').findOne({ _id: ObjectID(id)})
  }

  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie);
  }

  static updating(movie) {
    const { id, title, overview, poster_path, popularity, tags } = movie;
    return getDatabase().collection('movies').updateOne({ 
      _id: ObjectID(id) 
    }, {
      $set: {
        title,
        overview,
        poster_path,
        popularity,
        tags
      }
    })
  }

  static deleting(id) {
    return getDatabase().collection('movies').deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = Movie;