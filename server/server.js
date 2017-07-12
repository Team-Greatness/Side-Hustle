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

const PORT = 3000;
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/sidehustletesting' :  'mongodb://sidehustle:codesmith15@ds034677.mlab.com:34677/sidehustle';
mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
  console.log('Connected to Database ', process.env.NODE_ENV);
});

app.use('/build', express.static(__dirname +'./../build'));
app.use('/static', express.static(__dirname +'./../static'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', sessionController.isLoggedIn, userController.findUser, (req, res) => {
  res.sendFile(path.join(__dirname + './../static/signin.html'));
});

app.get('/oauth', oAuth.getCode);

app.get('/oauthcallback', oAuth.getToken, oAuth.apiRedirect, userController.startUser, sessionController.startSession, (req, res) =>{
  res.redirect('/app');
});

//route to main page.
app.get('/app', sessionController.isLoggedIn, sessionController.handleSession, (req, res) => {
  res.sendFile(path.join(__dirname + './../static/post.html'));
});
 //crud routes
app.get('/api', formController.pullData);

app.get('/myjobs', formController.myJobs);
app.get('/claims', formController.claims);

app.post('/post', formController.createForm);

app.delete('/deletejob', formController.deleteJob);

app.put('/updatejob', formController.updateJob);

//app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

const server = app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
module.exports = {server, mongoose};
