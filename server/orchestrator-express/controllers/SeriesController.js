const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const url = 'http://localhost:4002/series';

class SeriesController {
  static async getSeries(req, res) {
    try {
      const seriesData = await redis.get('series:data');
      if (seriesData) {
        res.status(200).json(JSON.parse(seriesData));
      } else {
        const { data } = await axios.get(url);
        redis.set('series:data', JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async getSeriesById(req, res) {
    const { id } = req.params;
    try {
      const { data } = await axios.get(`${url}/${id}`);
      res.status(200).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async addSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const { data } = await axios.post(url, {
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      await redis.del('series:data')
      res.status(201).json(data.ops);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async updateSeries(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      await axios.put(`${url}/${id}`, {
        title,
        overview,
        poster_path,
        popularity,
        tags 
      })
      const { data: seriesData } = await axios.get(`${url}/${id}`);
      await redis.del('series:data');
      res.status(200).json(seriesData);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async deleteSeries(req, res) {
    const { id } = req.params;
    try {
      const { data: seriesData } = await axios.get(`${url}/${id}`);
      await axios.delete(`${url}/${id}`);
      await redis.del('series:data');
      res.status(200).json(seriesData);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = SeriesController;