const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  provider: String,
  providerId: String,
});

module.exports = mongoose.model('User', schema);
