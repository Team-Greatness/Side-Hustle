const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('');

const formSchema = new Schema({
  title: {type: String, required: true},
  description : {type: String, required: true},
  address: {type: String, required: true},
  pay: {type: Number, required: true},
  claimant: {type: String, required: true, default: 'none'},
  userID: {type: String, required: true},
});

module.exports = mongoose.model('Form', formSchema);
