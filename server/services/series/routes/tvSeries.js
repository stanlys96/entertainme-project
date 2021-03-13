const express = require('express');

const router = express.Router();

const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.find);
router.get('/:id', TvSeriesController.findingOne);
router.post('/', TvSeriesController.create);
router.put('/:id', TvSeriesController.updating);
router.delete('/:id', TvSeriesController.deleting);

module.exports = router;