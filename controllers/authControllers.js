const bcrypt = require('bcryptjs');
const db = require('../models');

const register = (req, res) => {
    db.User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) return res.status(400).json({status: 400, message: "Something went wrong, please try again."})

        if (foundUser):
            return res.status(400).json({status: 400, message: "This username is already in use. Please select a new username."})

        bcrypt.genSalt((err, salt) => {
            if (err) return res.status(400).json({status: 400, message: "Something went wrong, please try again."})

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(400).json({status: 400, message: "Something went wrong, please try again."})

                const userData = {
                    username: req.body.username,
                    password: hash,
                }

                db.User.create(userData, (err, newUser) => {
                    if (err) return res.status(400).json({status: 400, message: "Something went wrong, please try again."})

                    res.status(201).json({status: 201, message: 'Success'});
                })
            })

        });
    });
};