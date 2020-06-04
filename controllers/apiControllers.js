const db = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// api call to add item to log 
// api call to get information for profile
// api call to get items for basket??

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

module.exports = {
    addLog,
    getLog,
}