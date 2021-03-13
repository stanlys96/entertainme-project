const express = require('express');

const router = express.Router();

const SeriesController = require('../controllers/SeriesController');

router.get('/', SeriesController.find);
router.get('/:id', SeriesController.findingOne);
router.post('/', SeriesController.create);
router.put('/:id', SeriesController.updating);
router.delete('/:id', SeriesController.deleting);

module.exports = router;