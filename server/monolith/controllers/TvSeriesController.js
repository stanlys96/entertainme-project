const TvSeries = require('../models/TvSeries');

class TvSeriesController {
  static async find(req, res) {
    try {
      const tvSeries = await TvSeries.find();
      res.json(tvSeries);
    } catch(err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    try {
      const tvSeries = await TvSeries.create(req.body);
      res.json(tvSeries);
    } catch(err) {
      console.log(err);
    }
  }

  static async updating(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const tvSeries = await TvSeries.updating({
        id,
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      res.json(tvSeries);
    } catch(err) {
      console.log(err);
    }
  }

  static async deleting(req, res) {
    const { id } = req.params;
    try {
      const tvSeries = await TvSeries.deleting(id);
      res.json(tvSeries);
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = TvSeriesController;