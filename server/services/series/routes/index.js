const express = require('express');
const router = express.Router();

const tvSeriesRoutes = require('./tvSeries');

router.use('/series', tvSeriesRoutes);

module.exports = router;