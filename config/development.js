module.exports = {
  mongoose: {
    uri: 'mongodb://database:27017/db',
  },
  email: {
    client: `http://localhost:3000`,
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
