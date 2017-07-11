const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const formController = require('./../controller/formController');

const PORT = 3000;
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/sidehustletesting' :  'mongodb://sidehustle:codesmith15@ds151752.mlab.com:51752/sidehustle';
mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/build', express.static(__dirname +'./../build'));
app.use('/static', express.static(__dirname +'./../static'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
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
