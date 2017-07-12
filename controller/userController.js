'use strict';

const User = require('./../model/userModel');

const userController = {

  findUser (req, res, next) {
    User.findOne({_id: req.cookies.ssid}, (err, user) => {
      if (err) {
        // res.redirect('/signin');
        next();
      } else {
        if (user){
          res.status(200);
          //res.params(user);
          res.redirect('/app');
        }
      }
      next();
    });
  },


  addUser (req, res, next) {
    //takes in git username and git email
    User.create({username: req.body}, (err, user) => {
      if (err) {
        res.status(404);
        res.end();
      } else {
        res.locals.ssid = user._id;
      }
    });
  },

  startUser (req, res, next) {
    // check userDB, return userID if found, create a user if not.

    User.findOne({username: res.locals.username, email: res.locals.email}, (err, user) => {
      if (err) {
        console.log(err);
        next(err);
      }
      if (user) {
        res.locals = user._id;
        next();
        return;
      }
      console.log('user ', user);
      console.log('locals', res.locals);
      User.create({'username': res.locals.username, 'email': res.locals.email}, (err, user) => {
        if (err) {
          console.log(err);
          next(err);
        }
          res.locals = user._id;
          next();
      });
    });
  }

}



module.exports = userController;
