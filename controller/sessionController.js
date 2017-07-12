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
    Session.create({ 'ssid': res.locals }, (err, session) => {
      if (err) {
        // res.status(404);
        // res.end();
        console.log('err');
        next(err);
      } else {
        //set session cookie.
        res.cookie('ssid', res.locals, { httpOnly:true, maxAge: 3600000 });
        next();
      }
    });
  }

}



module.exports = sessionController;
