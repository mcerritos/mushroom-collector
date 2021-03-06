const db = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// ----------------- GAMEPLAY (API)

const addLog = async (req, res) => {
    await db.User.findOne({_id: req.body.userId}, async (err, currentUser) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Database Error!'});
        }

        if (currentUser == null) {
            return res.status(400).json({message: "User not found!"});
        }

        await db.Mushroom.findOne({name: req.body.mushroom}, async (err, itemToLog) => {
            console.log(itemToLog)
            if (err) {
                return res.status(400).json({status: 400, error: 'Mushroom database error!'});
            }

            if (itemToLog == null) {
                return res.status(400).json({message: "Mushroom not found!"});
            }

            currentUser.log.push(itemToLog);
            await currentUser.save();

            const currentLog = currentUser.log;
            res.status(200).json({message: "Mushroom added!", currentLog: currentLog});
  
        });       
    })
}


const getLog = (req, res) => {
    db.User.findOne({id: req.params.currentUserId}, (err, currentUser) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Current user not found.'});
        }

        if (currentUser == null) {
            return res.status(400).json({message: "User not found!"});
        }

        const currentLog = currentUser.log;
        res.status(200).json({currentLog: currentLog});
    })
}

const getFloor = (req, res) => {
    let pickablesNum = Math.floor(Math.random() * (7)) + 13;

    db.Mushroom.findRandom({}, {}, {limit: pickablesNum}, function(err, results) {
        if (err) {
            return res.status(400).json({status: 400, error: 'Floor not found!'});
        }

        res.status(200).json({floor: results, message: "Floor established."});
      });
}

// api call to get items for basket??

module.exports = {
    addLog,
    getLog,
    getFloor,
}