const express = require('express');
const router = express.Router();

const moviesRoutes = require('./movies');

router.use('/movies', moviesRoutes);
router.get('/', (req, res) => {
  res.send('Hello!')
})

module.exports = router;