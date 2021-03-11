const express = require('express');
const router = express.Router();

const entertainMeRoutes = require('./entertainMe');
const moviesRoutes = require('./movies');
const tvSeriesRoutes = require('./tvSeries');

router.use('/entertainme', entertainMeRoutes);
router.use('/movies', moviesRoutes);
router.use('/tvseries', tvSeriesRoutes);

module.exports = router;