const express = require('express');
const router = express.Router();

const seriesRoutes = require('./series');

router.use('/series', seriesRoutes);

module.exports = router;