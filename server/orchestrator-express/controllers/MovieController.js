const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const url = 'http://localhost:4001/movies';

class MovieController {
  static async getMovies(req, res) {
    try {
      const moviesData = await redis.get('movies:data');
      if (moviesData) {
        res.status(200).json(JSON.parse(moviesData));
      } else {
        const { data } = await axios.get(url);
        redis.set('movies:data', JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async getMovieById(req, res) {
    const { id } = req.params;
    try {
      const { data } = await axios.get(`${url}/${id}`);
      res.status(200).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const { data } = await axios.post(url, {
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      await redis.del('movies:data');
      res.status(201).json(data.ops);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async updateMovie(req, res) {
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
      const { data: movieData } = await axios.get(`${url}/${id}`);
      await redis.del('movies:data');
      res.status(200).json(movieData);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async deleteMovie(req, res) {
    const { id } = req.params;
    try {
      const { data: movieData } = await axios.get(`${url}/${id}`);
      await axios.delete(`${url}/${id}`);
      await redis.del('movies:data');
      res.status(200).json(movieData);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MovieController;