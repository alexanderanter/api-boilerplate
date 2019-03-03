import * as fs from 'fs';
import * as path from 'path';
import * as pino from 'pino';
import * as logger from 'koa-pino-logger';
import * as config from 'config';

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

export = () => log;
