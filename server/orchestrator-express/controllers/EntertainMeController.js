const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

class EntertainMeController {
  static async findAll(req, res) {
    try {
      const moviesData = await redis.get('movies:data');
      const tvSeriesData = await redis.get('tvseries:data');
      if (!moviesData) {
        try {
          const movies = await axios.get('http://localhost:3001/movies');
          redis.set('movies:data', JSON.stringify(movies.data));
        } catch(err) {
          res.status(500).json(err);
        }
      } 
      if (!tvSeriesData) {
        try {
          const tvSeries = await axios.get('http://localhost:3002/tvseries');
          redis.set('tvseries:data', JSON.stringify(tvSeries.data));
        } catch(err) {
          res.status(500).json(err);
        }
      }
      res.status(200).json({
        movies: JSON.parse(await redis.get('movies:data')),
        tvSeries: JSON.parse(await redis.get('tvseries:data'))
      })
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = EntertainMeController;