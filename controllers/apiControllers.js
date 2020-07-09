const db = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// ----------------- GAMEPLAY (API)

const addLog = (req, res) => {
    db.User.findOne({id: req.params.userId}, (err, currentUser) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Database Error!'});
        }
        console.log(currentUser);

        if (currentUser == null) {
            return res.status(400).json({message: "User not found!"});
        }

        db.Mushroom.find({name : req.params.mushroom}, (err, itemToLog) => {
            if (err) {
                return res.status(400).json({status: 400, error: 'Mushroom not found.'});
            }
            
            // cannot read property log of null
            currentUser.log.push(itemToLog);
            res.status(200).json({status: 200, message: 'Mushroom added to log!'});    
        });       
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