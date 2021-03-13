const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

class MovieController {
  static async getMovies(req, res) {
    try {
      const moviesData = await redis.get('movies:data');
      if (moviesData) {
        res.status(200).json(JSON.parse(moviesData));
      } else {
        const { data } = await axios.get('http://localhost:3001/movies');
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
      const { data } = await axios.get(`http://localhost:3001/movies/${id}`);
      res.status(200).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      await redis.del('movies:data');
      const { data } = await axios.post('http://localhost:3001/movies', {
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

  static async updateMovie(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      await redis.del('movies:data');
      const { data } = await axios.put(`http://localhost:3001/movies/${id}`, {
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

  static async deleteMovie(req, res) {
    const { id } = req.params;
    try {
      await redis.del('movies:data');
      const { data } = await axios.delete(`http://localhost:3001/movies/${id}`);
      res.status(200).json(data);
    } catch(err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MovieController;