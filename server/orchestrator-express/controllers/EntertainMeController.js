const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

class EntertainMeController {
  static async findAll(req, res) {
    try {
      const moviesData = await redis.get('movies:data');
      const seriesData = await redis.get('series:data');
      if (!moviesData) {
        try {
          const movies = await axios.get('http://localhost:4001/movies');
          redis.set('movies:data', JSON.stringify(movies.data));
        } catch(err) {
          res.status(500).json(err);
        }
      } 
      if (!seriesData) {
        try {
          const series = await axios.get('http://localhost:4002/series');
          redis.set('series:data', JSON.stringify(series.data));
        } catch(err) {
          res.status(500).json(err);
        }
      }
      res.status(200).json({
        movies: JSON.parse(await redis.get('movies:data')),
        series: JSON.parse(await redis.get('series:data'))
      })
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = EntertainMeController;