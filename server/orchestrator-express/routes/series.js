const express = require('express');
const router = express.Router();
const SeriesController = require('../controllers/SeriesController');

router.get('/', SeriesController.getSeries);
router.get('/:id', SeriesController.getSeriesById);
router.post('/', SeriesController.addSeries);
router.put('/:id', SeriesController.updateSeries);
router.delete('/:id', SeriesController.deleteSeries);

module.exports = router;