const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const formController = require('./../controller/formController');
const userController = require('./../controller/userController');
const sessionController = require('./../controller/sessionController');
const oAuth = require('./../controller/oAuthController');


//NOTES:
// sessionctrlr checks for SSID, redirects if present. else, directs user to login

// usercontroller creates new users in the userDB.
//SSID is cookie, username and email are sent to body.

const PORT = 3000;
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/sidehustletesting' :  'mongodb://sidehustle:codesmith15@ds034677.mlab.com:34677/sidehustle';
mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/build', express.static(__dirname +'./../build'));
app.use('/static', express.static(__dirname +'./../static'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 // sign in app, session expires an hour after login. cookie should too.
app.get('/', sessionController.isLoggedIn, userController.findUser, (req, res) => {
  res.sendFile(path.join(__dirname + './../static/signin.html'));
});

//takes you to github oAuth.
app.get('/oauth', oAuth.getCode);


// get token, use it to get data from API, stick data in user collection, start the session. need to check if user existed already before creating a new user, and pull him out if so.
app.get('/oauthcallback', oAuth.getToken, oAuth.apiRedirect, userController.startUser, sessionController.startSession, (req, res) =>{
  res.redirect('/app');
});



//route to main page.
app.get('/app', sessionController.isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname + './../static/post.html'));
});

app.get('/api', formController.pullData);

app.post('/post', formController.createForm);

// TDD PORTION - write DB functions tomorrow.

app.delete('/deletejob', formController.deleteJob);

app.put('/updatejob', formController.updateJob);

//app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

const server = app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
module.exports = {server, mongoose};
