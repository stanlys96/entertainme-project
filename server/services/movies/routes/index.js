const express = require('express');
const router = express.Router();

const moviesRoutes = require('./movies');

router.use('/movies', moviesRoutes);

module.exports = router;