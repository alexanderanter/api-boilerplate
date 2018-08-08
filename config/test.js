const { MONGO_DB_URI = 'mongodb://localhost/test' } = process.env;

module.exports = {
  mongoose: {
    uri: MONGO_DB_URI,
  },
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
  },
  emailServer: {
    user: process.env.EMAIL_SERVER_USER,
    password: process.env.EMAIL_SERVER_PASSWORD,
    timeout: 6000,
    host: process.env.EMAIL_SERVER_HOST,
    tls: { ciphers: 'SSLv3' },
    ssl: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  email: {
    client: `http://localhost:3000`,
  },
  allowedOrigins: [
    'http://localhost:3000',
    'http://0.0.0.0:3000',
    'http://127.0.0.0:3000',
  ],
};
