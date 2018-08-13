const fs = require('fs');
const path = require('path');
const pino = require('pino');
const logger = require('koa-pino-logger');
const { DEVELOPMENT } = require('../constants/CONFIG');

const logDir = path.resolve(__dirname, '../../logs');
const { NODE_ENV } = process.env;

if (!fs.existsSync(logDir)) {
  fs.mkdir(logDir, () => {});
}

const loggerOptions = () =>
  NODE_ENV === DEVELOPMENT
    ? {
        prettyPrint: {
          levelFirst: true,
          colorize: true,
        },
        // eslint-disable-next-line
        prettifier: require('pino-pretty'),
      }
    : {};

module.exports = () =>
  logger(
    loggerOptions(),
    NODE_ENV !== DEVELOPMENT && pino.destination(`${logDir}/log.json`),
  );
