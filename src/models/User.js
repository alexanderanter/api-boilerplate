import mongoose from 'mongoose';

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  provider: String,
  providerId: String,
});

// Dynamic import must be CommonJS Module
module.exports = mongoose.model('User', schema);
