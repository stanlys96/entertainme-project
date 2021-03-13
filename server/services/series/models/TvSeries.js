const { getDatabase } = require('../config/mongodb');

const ObjectID = require('mongodb').ObjectID;

class TvSeries {
  static find() {
    return getDatabase().collection('tvSeries').find().toArray();
  }

  static findingOne(id) {
    return getDatabase().collection('tvSeries').findOne({ _id: ObjectID(id) })
  }

  static create(tvSeries) {
    return getDatabase().collection('tvSeries').insertOne(tvSeries);
  }

  static updating(tvSeries) {
    const { id, title, overview, poster_path, popularity, tags } = tvSeries;
    return getDatabase().collection('tvSeries').updateOne({ 
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
    return getDatabase().collection('tvSeries').deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = TvSeries;