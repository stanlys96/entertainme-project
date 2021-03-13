const Movie = require('../models/Movie');

class MoviesController {
  static async find(req, res) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch(err) {
      console.log(err);
    }
  }

  static async findingOne(req, res) {
    const { id } = req.params;
    try {
      const movies = await Movie.findingOne(id);
      res.status(200).json(movies);
    } catch(err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    try {
      const movie = await Movie.create(req.body);
      res.status(201).json(movie.ops);
    } catch(err) {
      console.log(err);
    }
  }

  static async updating(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      await Movie.updating({
        id,
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      const movieData = await Movie.findingOne(id);
      res.status(200).json(movieData);
    } catch(err) {
      console.log(err);
    }
  }

  static async deleting(req, res) {
    const { id } = req.params;
    try {
      const movieData = await Movie.findingOne(id);
      await Movie.deleting(id);
      res.status(200).json(movieData);
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = MoviesController;