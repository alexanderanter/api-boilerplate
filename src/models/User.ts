import * as mongoose from 'mongoose';

export interface iUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  provider: string;
  token: {
    IV: Buffer;
    encrypted: string;
    tag: Buffer;
    hash: string;
  };
}

const schema: mongoose.Schema = new mongoose.Schema({
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
