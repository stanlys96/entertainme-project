const Series = require('../models/Series');

class SeriesController {
  static async find(req, res) {
    try {
      const series = await Series.find();
      res.status(200).json(series);
    } catch(err) {
      console.log(err);
    }
  }

  static async findingOne(req, res) {
    const { id } = req.params;
    try {
      const series = await Series.findingOne(id);
      res.status(200).json(series);
    } catch(err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    try {
      const series = await Series.create(req.body);
      res.status(201).json(series.ops);
    } catch(err) {
      console.log(err);
    }
  }

  static async updating(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      await Series.updating({
        id,
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      const seriesData = await Series.findingOne(id);
      res.status(200).json(seriesData);
    } catch(err) {
      console.log(err);
    }
  }

  static async deleting(req, res) {
    const { id } = req.params;
    try {
      const seriesData = await Series.findingOne(id);
      await Series.deleting(id);
      res.status(200).json(seriesData);
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = SeriesController;