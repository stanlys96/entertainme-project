const { getDatabase } = require('../config/mongodb');

const ObjectID = require('mongodb').ObjectID;

class Series {
  static find() {
    return getDatabase().collection('series').find().toArray();
  }

  static findingOne(id) {
    return getDatabase().collection('series').findOne({ _id: ObjectID(id) })
  }

  static create(series) {
    return getDatabase().collection('series').insertOne(series);
  }

  static updating(series) {
    const { id, title, overview, poster_path, popularity, tags } = series;
    return getDatabase().collection('series').updateOne({ 
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
    return getDatabase().collection('series').deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = Series;