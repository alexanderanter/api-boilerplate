import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: String,
});

// Dynamic import must be CommonJS Module
module.exports = mongoose.model('User', schema);
