const express = require('express');

const router = express.Router();
const moviesRoutes = require('./movies');
const tvSeriesRoutes = require('./tvSeries');

router.use('/movies', moviesRoutes);
router.use('/tvseries', tvSeriesRoutes);

module.exports = router;