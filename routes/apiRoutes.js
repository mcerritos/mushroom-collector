 
const express = require('express');
const router = express.Router();
const db = require('../models');
const ctrl = require('../controllers');

// CURRENT PATH = '/api/v1/'

// // GET Cities Index
// router.get('/cities', ctrl.citiesCtrl.index);

// // GET Cities Show
// router.get('/cities/:id', ctrl.citiesCtrl.show);

module.exports = router;