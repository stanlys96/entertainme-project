const express = require('express');
const router = express.Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.getTvSeries);
router.get('/:id', TvSeriesController.getTvSeriesById);
router.post('/', TvSeriesController.addTvSeries);
router.put('/:id', TvSeriesController.updateTvSeries);
router.delete('/:id', TvSeriesController.deleteTvSeries);

module.exports = router;