const express = require('express');
const router = express.Router();

const tvSeriesRoutes = require('./tvSeries');

router.use('/tvseries', tvSeriesRoutes);

module.exports = router;