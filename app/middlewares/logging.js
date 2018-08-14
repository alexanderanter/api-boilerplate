const fs = require('fs');
const path = require('path');
const pino = require('pino');
const logger = require('koa-pino-logger');
const config = require('config');

const { DEVELOPMENT } = require('../constants/CONFIG');

const options = config.get('logging');

const logDir = path.resolve(__dirname, '../../logs');
const { NODE_ENV } = process.env;

if (!fs.existsSync(logDir)) {
  fs.mkdir(logDir, () => {});
}

const log = logger(
  options,
  NODE_ENV !== DEVELOPMENT && pino.destination(`${logDir}/log.json`),
);

module.exports = () => log;
