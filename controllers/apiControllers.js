const db = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// ----------------- GAMEPLAY (API)

const addLog = (req, res) => {
    db.User.findById((req.params.id), (err, currentUser) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Current user not found.'});
        }

        db.Mushroom.find({name : req.params.mushroom}, (err, itemToLog) => {
            if (err) {
                return res.status(400).json({status: 400, error: 'Mushroom not found.'});
            }

            const newLogEntry = itemToLog;
            currentUser.log.push(newLogEntry);
            res.status(200).json({status: 200, message: 'Mushroom added to log!'});
        } );        
    })
}

const getLog = (req, res) => {
    db.User.findById((req.params.id), (err, currentUser) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Current user not found.'});
        }

        const currentLog = currentUser.log;


        res.status(200).json({currentLog: currentLog});
    })
}


// api call to get items for basket??

module.exports = {
    addLog,
    getLog,
}