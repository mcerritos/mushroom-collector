 
const express = require('express');
const router = express.Router();
const db = require('../models');
const ctrl = require('../controllers');

// ----------------- GAMEPLAY (API)
router.post('/addLog', ctrl.apiCtrl.addLog);
router.post('/getLog', ctrl.apiCtrl.getLog);

// ----------------- AUTH
router.post('/register', ctrl.authCtrl.register);
router.post('/login', ctrl.authCtrl.login);
router.delete('/logout', ctrl.authCtrl.logout);
router.get('/verify', ctrl.authCtrl.verify);


module.exports = router;