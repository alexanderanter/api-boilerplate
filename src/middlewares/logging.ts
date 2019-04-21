import fs from 'fs';
import path from 'path';
import pino from 'pino';
import logger from 'koa-pino-logger';
import config from 'config';

import { DEVELOPMENT } from '../constants/CONFIG';

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

export default () => log;
