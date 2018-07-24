module.exports = {
  mongoose: {
    uri: 'mongodb://database:27017/db',
  },
  emailServer: {
    user: process.env.EMAIL_SERVER_USER,
    password: process.env.EMAIL_SERVER_PASSWORD,
    timeout: 6000,
    host: process.env.EMAIL_SERVER_HOST,
    tls: { ciphers: 'SSLv3' },
    ssl: true,
  },
  passwordless: {
    url: `http://localhost:${process.env.PORT}`,
  },
};
