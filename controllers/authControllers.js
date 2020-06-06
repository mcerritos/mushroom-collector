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

const login = (req, res) => {
    // Verify req.body Is Not Empty
    if(!req.body) {
        return res.status(400).json({status: 400, message: 'Invalid credentials'});
    }
  
    // Find User By Email
    db.User.findOne({username: req.body.username}, (err, foundUser) => {
      if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
  
      // Verify User Account Exists
      if (!foundUser) {
        return res.status(400).json({status: 400, message: 'Invalid credentials'});
      }
  
      // Hash Password From User Request and Compare Against Found User Password
      bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
        if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});
  
        if (isMatch) {
          // Create a New Session
          req.session.currentUser = {
            _id: foundUser._id,
            username: foundUser.username,
            basket: foundUser.basket,
            log: foundUser.log,
          };
  
          res.status(200).json({status: 200, user: req.session.currentUser});
        } else {
          // Passwords Do Not Match, Respond with User Error
          res.status(400).json({status: 400, error: 'Invalid credentials, please try again'});
        }
      });
    });
};

const logout = (req, res) => {
    if (!req.session.currentUser) {
      // Not Authorized
      return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again'});
    }
    
    // Destroy Session and Respond with Success
    req.session.destroy((err) => {
      if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});
  
      res.status(200).json({status: 200, message: 'Success'});
    });
};

const verify = (req, res) => {
    if (!req.session.currentUser) {
      // Not Authorized
      return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again'});
    }
  
    return res.json({
      status: 200,
      message: 'Authorized',
      currentUser: req.session.currentUser,
    });
};

module.exports = {
    register,
    login,
    logout,
    verify,
  };