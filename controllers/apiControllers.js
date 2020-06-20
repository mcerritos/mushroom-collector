const db = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// ----------------- GAMEPLAY (API)

const addLog = (req, res) => {
    db.User.findById(req.params.UserId, (err, currentUser) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Current user not found.'});
        }

        currentUser.log.push(req.params.mushroomId)
    })
}

const getLog = (req, res) => {
    db.User.findById(req.params.UserId, (err, currentUser) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Current user not found.'});
        }

        const currentLog = currentUser.log ;
        res.json(currentLog);
    })
}


// api call to get items for basket??

module.exports = {
    addLog,
    getLog,
}