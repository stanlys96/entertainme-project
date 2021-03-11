const express = require('express');

const router = express.Router();

const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.find);
router.post('/', TvSeriesController.create);
router.put('/:id', TvSeriesController.updating);
router.delete('/:id', TvSeriesController.deleting);

module.exports = router;