const request = require('request');
const qs = require('qs');


const oAuthController = {

  getCode (req, res, next) {
    const url ='https://github.com/login/oauth/authorize?' +
    this.buildCodeQS();

    res.redirect(url);
  },

  getToken (req, res, next) {
    const code = req.query.code;

    const tokenQuery = this.buildTokenQS(code);
    const url =  'https://github.com/login/oauth/access_token?';

    request.post(url + tokenQuery, (err, response, body) => {
      const tokenType = qs.parse(body);
      res.locals = tokenType;
      next();
    });
     // send request to github for token
  },


  apiRedirect (req, res, next) {
    const token = res.locals.access_token;

    const accessUrl = {
      url: 'https://api.github.com/user?access_token=' + token,
      headers: {
        'User-Agent' : 'Side Hustle',
      }
    };

    request(accessUrl, (error, response, body) => {
      body = JSON.parse(body);
      res.locals = {
        username: body.login,
        email: body.email
      }
      next();
    });
  }
}

oAuthController.buildCodeQS = function() {
  const qObj = {
    client_id: 'CLIENT ID HERE',
    redirect_url: 'http://localhost:3000/oauthcallback',
    scope: 'user',
  }
  return qs.stringify(qObj);
}

oAuthController.buildTokenQS = function (aCode) {
  const qObj = {
    client_id:  'client ID',
    client_secret: 'client SECRET',
    code: aCode,
  }
  return qs.stringify(qObj);
}

module.exports = oAuthController;
