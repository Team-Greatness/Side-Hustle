const request = require('request');
const qs = require('qs');


const oAuthController = {

  getCode (req, res, next) {

    const qObj = {
      client_id: '83ab5b077c1041ed2fed',
      redirect_url: 'http://localhost:3000/oauthcallback',
      scope: 'user',
    }

    const url ='https://github.com/login/oauth/authorize?' + qs.stringify(qObj);

    res.redirect(url);
  },

  getToken (req, res, next) {
    const code = req.query.code;

    const qObj = {
      client_id:  '83ab5b077c1041ed2fed',
      client_secret: '2384b41a2404b26375d05f995dc19f4c406890b5',
      code: code,
    }
    const tokenQuery = qs.stringify(qObj);

    // const tokenQuery = buildTokenQS(code);
    const url =  'https://github.com/login/oauth/access_token?';

    request.post(url + tokenQuery, (err, response, body) => {
      const tokenType = qs.parse(body);
      res.locals = tokenType;
      next();
    });
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
      res.body = {
        username: body.login,
        email: body.email
      }
      next();
    });
  }
}


module.exports = oAuthController;
