module.exports = {
  mongoose: {
    uri: 'mongodb://database:27017/db',
  },
  email: {
    client: `http://localhost:3000`,
  },
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID || '123456',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'keyboardcat',
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '123456',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'keyboardcat',
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
  },
  allowedOrigins: [
    'http://localhost:3000',
    'http://0.0.0.0:3000',
    'http://127.0.0.0:3000',
  ],
  logging: {
    level: 'trace',
    prettyPrint: {
      levelFirst: true,
      colorize: true,
    },
    // eslint-disable-next-line
    prettifier: require('pino-pretty'),
  },
};
