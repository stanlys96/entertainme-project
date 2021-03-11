const Movie = require('../models/Movie');

class MoviesController {
  static async find(req, res) {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch(err) {
      console.log(err);
    }
  }

  static async findingOne(req, res) {
    const { id } = req.params;
    try {
      const movies = await Movie.findingOne(id);
      res.json(movies);
    } catch(err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    try {
      const movie = await Movie.create(req.body);
      res.json(movie);
    } catch(err) {
      console.log(err);
    }
  }

  static async updating(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const movie = await Movie.updating({
        id,
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      res.json(movie);
    } catch(err) {
      console.log(err);
    }
  }

  static async deleting(req, res) {
    const { id } = req.params;
    try {
      const movie = await Movie.deleting(id);
      res.json(movie);
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = MoviesController;