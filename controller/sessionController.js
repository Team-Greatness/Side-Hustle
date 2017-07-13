'use strict';

const Session = require('./../model/sessionModel');

const sessionController = {

  isLoggedIn (req, res, next) {
    if (res.cookie.ssid){
      Session.findOne({ssid: res.cookie.ssid}, (err, session) => {
        if (!err) {
          if (Object.keys(session).length >= 1){
            res.status(200);
            res.locals(session.ssid);
            next();
          }
        }
      });
    } else {
      next();
    }
  },

  startSession (req, res, next) {
    // takes SSID and sticks it in DB.

    Session.findOneAndRemove({'ssid': res.locals }, (err, session) => {
      // remove existing session cookie if it exists, and create a new one.
      if (err) {
        next(err);
      } else {
        Session.create({ 'ssid': res.locals }, (err, session) => {
          if (err) {
            next(err);
          } else {
            //set session cookie.
            res.cookie('ssid', res.locals, { httpOnly:true, maxAge: 3600000 });
            next();
          }
        });
      }
    });

  },

  handleSession (req, res, next) {
    if (req.cookies.ssid) {
      next();
    } else {
      res.redirect('/login');
    }
  }

}

module.exports = sessionController;
