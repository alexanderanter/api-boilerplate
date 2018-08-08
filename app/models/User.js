const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  provider: String,
  token: {
    IV: Buffer,
    encrypted: String,
    tag: Buffer,
    hash: String,
  },
});

const model = mongoose.model('User', schema);

module.exports = model;
