const express = require('express');

const router = express.Router();
const moviesRoutes = require('./movies');
const seriesRoutes = require('./series');

router.use('/movies', moviesRoutes);
router.use('/series', seriesRoutes);

module.exports = router;