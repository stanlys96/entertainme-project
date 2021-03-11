const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

class TvSeriesController {
  static async getTvSeries(req, res) {
    try {
      const tvSeriesData = await redis.get('tvseries:data');
      if (tvSeriesData) {
        res.status(200).json(JSON.parse(tvSeriesData));
      } else {
        const { data } = await axios.get('http://localhost:3002/tvseries');
        redis.set('tvseries:data', JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async getTvSeriesById(req, res) {
    const { id } = req.params;
    try {
      const { data } = await axios.get(`http://localhost:3002/tvseries/${id}`);
      res.status(200).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async addTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      await redis.del('tvseries:data')
      const { data } = await axios.post('http://localhost:3002/tvseries', {
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      res.status(201).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async updateTvSeries(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      await redis.del('tvseries:data');
      const { data } = await axios.put(`http://localhost:3002/tvseries/${id}`, {
        title,
        overview,
        poster_path,
        popularity,
        tags 
      })
      res.status(200).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async deleteTvSeries(req, res) {
    const { id } = req.params;
    try {
      await redis.del('tvseries:data');
      const { data } = await axios.delete(`http://localhost:3002/tvseries/${id}`);
      res.status(200).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = TvSeriesController;