const express = require('express');

const router = express.Router();

const MoviesController = require('../controllers/MoviesController');

router.get('/', MoviesController.find);
router.post('/', MoviesController.create);
router.put('/:id', MoviesController.updating);
router.delete('/:id', MoviesController.deleting);

module.exports = router;