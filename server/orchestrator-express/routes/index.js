const express = require('express');
const router = express.Router();

const entertainMeRoutes = require('./entertainMe');
const moviesRoutes = require('./movies');
const seriesRoutes = require('./series');

router.use('/entertainme', entertainMeRoutes);
router.use('/movies', moviesRoutes);
router.use('/series', seriesRoutes);

module.exports = router;