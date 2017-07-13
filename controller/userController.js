'use strict';

const User = require('./../model/userModel');

const userController = {

  findUser (req, res, next) {
    User.findOne({_id: req.cookies.ssid}, (err, user) => {
      if (err) {
        next();
      } else {
        if (user){
          res.status(200);
          res.redirect('/');
        } else {
          next();
        }
      }
    });
  },

  startUser (req, res, next) {
    // check userDB, return userID if found, create a user if not.
    User.findOne({username: res.body.username, email: res.body.email}, (err, user) => {
      if (err) {
        next(err);
      }
      if (user) {
        res.locals = user._id;
        next();
        return;
      }
      User.create({'username': res.body.username, 'email': res.body.email}, (err, user) => {
        if (err) {
          next(err);
        }
          res.locals = user._id;
          next();
      });
    });
  }

}



module.exports = userController;
