const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('');

const sessionSchema = new Schema({
  ssid : { type: String, required: true },
  createdAt: {type: Date, expires: 3600, default: Date.now}
});

module.exports = mongoose.model('Session', sessionSchema);
