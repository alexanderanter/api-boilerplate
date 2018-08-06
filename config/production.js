const { MONGO_DB_URI = 'mongodb://localhost/db' } = process.env;

module.exports = {
  mongoose: {
    uri: MONGO_DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
