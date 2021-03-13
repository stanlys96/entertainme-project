const Series = require('../models/Series');

class SeriesController {
  static async find(req, res) {
    try {
      const series = await Series.find();
      res.json(series);
    } catch(err) {
      console.log(err);
    }
  }

  static async findingOne(req, res) {
    const { id } = req.params;
    try {
      const series = await Series.findingOne(id);
      res.json(series); 
    } catch(err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    try {
      const series = await Series.create(req.body);
      res.json(series);
    } catch(err) {
      console.log(err);
    }
  }

  static async updating(req, res) {
    const { id } = req.params;
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const series = await Series.updating({
        id,
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      res.json(series);
    } catch(err) {
      console.log(err);
    }
  }

  static async deleting(req, res) {
    const { id } = req.params;
    try {
      const series = await Series.deleting(id);
      res.json(series);
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = SeriesController;