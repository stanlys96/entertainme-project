const express = require('express');
const router = express.Router();
const EntertainMeController = require('../controllers/EntertainMeController');

router.get('/', EntertainMeController.findAll);

module.exports = router;